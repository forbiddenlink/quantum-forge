const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const syntax = require('postcss-scss');

// Configuration
const config = {
    rootDir: path.resolve(__dirname, '../styles'),
    excludeDirs: ['node_modules', 'dist', 'build', 'backups'],
    excludeFiles: ['office-visualizer.css', 'main.css'], // Temporarily exclude problematic files
    fileExtensions: ['.css', '.scss'],
};

// Store rules for comparison
const ruleMap = new Map();
const duplicateRules = new Map();

// Helper to normalize CSS rule for comparison
function normalizeRule(rule) {
    return rule.toString().replace(/\s+/g, ' ').trim();
}

// Process a CSS file
async function processFile(filePath) {
    console.log(`Processing file: ${filePath}`);
    try {
        const css = fs.readFileSync(filePath, 'utf8');
        const result = await postcss().process(css, { 
            from: filePath,
            syntax: syntax 
        });

        result.root.walkRules(rule => {
            const normalized = normalizeRule(rule);
            const existing = ruleMap.get(normalized);
            const relativePath = path.relative(config.rootDir, filePath);

            if (existing) {
                if (!duplicateRules.has(normalized)) {
                    duplicateRules.set(normalized, [existing]);
                }
                duplicateRules.get(normalized).push({
                    file: relativePath,
                    line: rule.source.start.line,
                    selector: rule.selector
                });
            } else {
                ruleMap.set(normalized, {
                    file: relativePath,
                    line: rule.source.start.line,
                    selector: rule.selector
                });
            }
        });
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

// Walk directory recursively
async function walkDir(dir) {
    try {
        const files = fs.readdirSync(dir);
        const promises = [];
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
                                    if (stat.isDirectory() && !config.excludeDirs.includes(file)) {
                            promises.push(walkDir(filePath));
                        } else if (config.fileExtensions.includes(path.extname(file)) && !config.excludeFiles.includes(file)) {
                            promises.push(processFile(filePath));
                        }
        }
        
        await Promise.all(promises);
    } catch (error) {
        console.error(`Error walking directory ${dir}:`, error);
    }
}

// Generate report
function generateReport() {
    let report = '# CSS Duplication Report\n\n';
    
    if (duplicateRules.size === 0) {
        report += 'No duplicate rules found.\n';
        return report;
    }
    
    report += `Found ${duplicateRules.size} duplicate rule(s).\n\n`;
    
    duplicateRules.forEach((occurrences, rule) => {
        report += '## Duplicate Rule Found\n\n';
        report += '### Locations:\n';
        occurrences.forEach(loc => {
            report += `- ${loc.file}:${loc.line} (${loc.selector})\n`;
        });
        report += '\n### Rule Content:\n```css\n' + rule + '\n```\n\n';
    });
    
    return report;
}

// Main execution
async function main() {
    try {
        console.log('Starting CSS duplication analysis...');
        console.log(`Root directory: ${config.rootDir}`);
        
        await walkDir(config.rootDir);
        
        const report = generateReport();
        const reportPath = path.join(__dirname, 'css-duplication-report.md');
        fs.writeFileSync(reportPath, report);
        
        console.log(`Report generated successfully at: ${reportPath}`);
        console.log(`Found ${duplicateRules.size} duplicate rules.`);
    } catch (error) {
        console.error('Error during execution:', error);
        process.exit(1);
    }
}

main(); 