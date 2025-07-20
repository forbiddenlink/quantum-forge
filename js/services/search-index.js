// Search Indexing Service
class SearchIndexService {
    constructor() {
        this.index = new Map();
        this.observers = new Set();
        this.indexingQueue = [];
        this.isIndexing = false;
    }

    // Subscribe to index updates
    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }

    // Notify observers of index updates
    notify() {
        this.observers.forEach(callback => callback(this.index));
    }

    // Add content to the index
    async addToIndex(path, content) {
        this.indexingQueue.push({ path, content });
        if (!this.isIndexing) {
            await this.processQueue();
        }
    }

    // Process the indexing queue
    async processQueue() {
        if (this.indexingQueue.length === 0) {
            this.isIndexing = false;
            return;
        }

        this.isIndexing = true;
        const { path, content } = this.indexingQueue.shift();

        // Process the content in chunks to avoid blocking the main thread
        await this.processContent(path, content);

        // Process next item in queue
        await this.processQueue();
    }

    // Process content and add to index
    async processContent(path, content) {
        // Break content into chunks for processing
        const chunks = this.chunkContent(content);
        
        for (const chunk of chunks) {
            await new Promise(resolve => {
                setTimeout(() => {
                    this.indexChunk(path, chunk);
                    resolve();
                }, 0);
            });
        }

        this.notify();
    }

    // Break content into manageable chunks
    chunkContent(content) {
        // Split content into paragraphs
        const paragraphs = content.split(/\n\n+/);
        const chunks = [];
        let currentChunk = '';

        for (const paragraph of paragraphs) {
            if (currentChunk.length + paragraph.length > 1000) {
                chunks.push(currentChunk);
                currentChunk = paragraph;
            } else {
                currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
            }
        }

        if (currentChunk) {
            chunks.push(currentChunk);
        }

        return chunks;
    }

    // Index a chunk of content
    indexChunk(path, content) {
        // Tokenize and normalize content
        const tokens = this.tokenize(content);
        
        // Add tokens to index
        tokens.forEach((token, position) => {
            if (!this.index.has(token)) {
                this.index.set(token, new Map());
            }

            const locations = this.index.get(token);
            if (!locations.has(path)) {
                locations.set(path, []);
            }

            locations.get(path).push({
                position,
                context: this.getContext(content, position)
            });
        });
    }

    // Tokenize and normalize text
    tokenize(text) {
        return text.toLowerCase()
            // Split into words
            .split(/[\s\-_]+/)
            // Remove punctuation
            .map(word => word.replace(/[^\w\-]/g, ''))
            // Remove empty strings and common words
            .filter(word => word && !this.isStopWord(word));
    }

    // Check if word is a stop word
    isStopWord(word) {
        const stopWords = new Set([
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
            'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
            'that', 'the', 'to', 'was', 'were', 'will', 'with'
        ]);
        return stopWords.has(word);
    }

    // Get context around a position in text
    getContext(text, position, contextSize = 100) {
        const start = Math.max(0, position - contextSize);
        const end = Math.min(text.length, position + contextSize);
        return text.slice(start, end).trim();
    }

    // Search the index
    search(query) {
        const tokens = this.tokenize(query);
        const results = new Map();

        // Search for each token
        tokens.forEach(token => {
            if (this.index.has(token)) {
                const locations = this.index.get(token);
                locations.forEach((positions, path) => {
                    if (!results.has(path)) {
                        results.set(path, {
                            score: 0,
                            matches: []
                        });
                    }

                    const result = results.get(path);
                    result.score += positions.length;
                    result.matches.push(...positions);
                });
            }
        });

        // Sort results by score
        return Array.from(results.entries())
            .map(([path, { score, matches }]) => ({
                path,
                score,
                matches: this.deduplicateMatches(matches)
            }))
            .sort((a, b) => b.score - a.score);
    }

    // Deduplicate and merge overlapping matches
    deduplicateMatches(matches) {
        return matches
            .sort((a, b) => a.position - b.position)
            .reduce((unique, match) => {
                const last = unique[unique.length - 1];
                if (!last || !this.overlaps(last, match)) {
                    unique.push(match);
                }
                return unique;
            }, []);
    }

    // Check if two matches overlap
    overlaps(a, b, threshold = 50) {
        const aStart = a.position - threshold;
        const aEnd = a.position + threshold;
        return b.position >= aStart && b.position <= aEnd;
    }

    // Clear the index
    clear() {
        this.index.clear();
        this.indexingQueue = [];
        this.isIndexing = false;
        this.notify();
    }
}

// Export as singleton
export const searchIndexService = new SearchIndexService(); 