const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    rootDir: path.resolve(__dirname, '../styles'),
    excludeDirs: ['node_modules', 'dist', 'build', 'backups'],
    fileExtensions: ['.css', '.scss'],
};

// Common duplicated rules to remove (from our analysis)
const duplicatedRules = [
    // Animation keyframes that are now in animations.css
    {
        pattern: /@keyframes\s+(fade-in|fade-out|slide-in-right|slide-in-left|slide-in-up|slide-in-down|scale-in|scale-out|pulse|pulse-shadow|glow|shimmer|progress-loading|spin|bounce|float|shake|ring|task-complete|task-sparkle|insight-appear|insight-glow)\s*\{[\s\S]*?\}/g,
        description: 'Animation keyframes',
        files: ['analytics-dashboard.css', 'enhanced-colors.css', 'enhanced-knowledge-hub.css', 'enhanced-task-system.css', 'live-activity-feed.css', 'team.css', 'contest-enhancements.css', 'creative-enhancements.css', 'main.css', 'office-visualizer.css', 'team-chat-widget.css', 'wellness-tracker.css', 'dream-workspace.css', 'enhanced.css', 'sidebar.css']
    },
    // Common utility classes that are now in utilities.css
    {
        pattern: /\.(sr-only|sr-only-focusable|live-region|flex|flex-inline|flex-col|flex-row|items-center|items-start|items-end|justify-center|justify-between|justify-start|justify-end|flex-wrap|flex-nowrap|flex-1|flex-auto|flex-initial|flex-none|grid|grid-cols-1|grid-cols-2|grid-cols-3|grid-cols-4|gap-1|gap-2|gap-3|gap-4|text-left|text-center|text-right|text-primary|text-secondary|text-muted|font-bold|font-semibold|font-medium|font-normal|hidden|block|inline|inline-block|relative|absolute|fixed|sticky|overflow-hidden|overflow-auto|overflow-scroll|overflow-visible|cursor-pointer|cursor-default|cursor-not-allowed|transition|transition-fast|transition-slow)\s*\{[^}]*\}/g,
        description: 'Utility classes',
        files: ['main.css', 'enhanced.css', 'analytics-dashboard.css']
    },
    // Common component styles that are now in components.css
    {
        pattern: /\.(btn|btn-primary|btn-secondary|btn-success|btn-warning|btn-error|btn-ghost|btn-outline|card|card-header|card-content|card-footer|form-group|form-label|form-input|form-textarea|form-select|form-checkbox|form-radio|badge|badge-primary|badge-secondary|badge-success|badge-warning|badge-error|tooltip|tooltip-content|modal|modal-header|modal-content|modal-footer|dropdown|dropdown-menu|dropdown-item|alert|alert-info|alert-success|alert-warning|alert-error|progress|progress-bar|progress-fill|loading|loading-spinner|loading-overlay)\s*\{[^}]*\}/g,
        description: 'Common component styles',
        files: ['main.css', 'enhanced.css', 'analytics-dashboard.css', 'enhanced-task-system.css']
    }
];

// Function to remove duplicated rules from a file
function removeDuplicatedRules(filePath, rules) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let removedCount = 0;

        rules.forEach(rule => {
            const matches = content.match(rule.pattern);
            if (matches) {
                content = content.replace(rule.pattern, '');
                removedCount += matches.length;
                console.log(`  - Removed ${matches.length} ${rule.description} from ${path.basename(filePath)}`);
            }
        });

        if (removedCount > 0) {
            // Clean up extra whitespace
            content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
            fs.writeFileSync(filePath, content);
            console.log(`  ✓ Updated ${path.basename(filePath)} (removed ${removedCount} rules)`);
            return removedCount;
        }
        return 0;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return 0;
    }
}

// Function to process all files
async function processFiles() {
    console.log('Starting duplicate removal process...\n');

    let totalRemoved = 0;
    const processedFiles = new Set();

    for (const rule of duplicatedRules) {
        console.log(`Processing ${rule.description}...`);
        
        for (const fileName of rule.files) {
            const filePath = path.join(config.rootDir, fileName);
            
            if (fs.existsSync(filePath) && !processedFiles.has(filePath)) {
                const removed = removeDuplicatedRules(filePath, [rule]);
                totalRemoved += removed;
                processedFiles.add(filePath);
            }
        }
        console.log('');
    }

    console.log(`\nDuplicate removal completed!`);
    console.log(`Total rules removed: ${totalRemoved}`);
    console.log(`Files processed: ${processedFiles.size}`);
}

// Main execution
if (require.main === module) {
    processFiles().catch(error => {
        console.error('Error during execution:', error);
        process.exit(1);
    });
}

module.exports = { removeDuplicatedRules, processFiles }; 