const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    rootDir: '../styles',
    backupDir: '../styles/backups',
    excludeDirs: ['node_modules', 'dist', 'build', 'backups'],
    fileExtensions: ['.css', '.scss']
};

// Create timestamp for backup
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-');
}

// Create backup directory if it doesn't exist
function ensureBackupDir() {
    if (!fs.existsSync(config.backupDir)) {
        fs.mkdirSync(config.backupDir, { recursive: true });
    }
}

// Create manifest file for the backup
function createManifest(backupDir, files) {
    const manifest = {
        timestamp: new Date().toISOString(),
        files: files.map(file => ({
            original: file,
            backup: path.relative(config.rootDir, path.join(backupDir, path.basename(file)))
        }))
    };

    fs.writeFileSync(
        path.join(backupDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
    );
}

// Backup a single file
function backupFile(filePath, backupDir) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(backupDir, fileName);
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
}

// Walk directory and backup files
function walkAndBackup(dir, backupDir) {
    const files = fs.readdirSync(dir);
    const backedUpFiles = [];
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !config.excludeDirs.includes(file)) {
            backedUpFiles.push(...walkAndBackup(filePath, backupDir));
        } else if (config.fileExtensions.includes(path.extname(file))) {
            backupFile(filePath, backupDir);
            backedUpFiles.push(filePath);
        }
    });

    return backedUpFiles;
}

// Restore from backup
function restore(backupDir) {
    const manifestPath = path.join(backupDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        throw new Error('Manifest file not found in backup directory');
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.files.forEach(file => {
        const backupPath = path.join(config.rootDir, file.backup);
        const originalPath = path.join(config.rootDir, file.original);
        fs.copyFileSync(backupPath, originalPath);
    });
}

// Main backup function
function backup() {
    ensureBackupDir();
    const timestamp = getTimestamp();
    const backupDir = path.join(config.backupDir, timestamp);
    fs.mkdirSync(backupDir);

    const backedUpFiles = walkAndBackup(config.rootDir, backupDir);
    createManifest(backupDir, backedUpFiles);

    console.log(`Backup created at: ${backupDir}`);
    console.log(`${backedUpFiles.length} files backed up`);
}

// Command line interface
const command = process.argv[2];
const backupDir = process.argv[3];

switch (command) {
    case 'backup':
        backup();
        break;
    case 'restore':
        if (!backupDir) {
            console.error('Please specify backup directory to restore from');
            process.exit(1);
        }
        restore(backupDir);
        console.log('Restore completed');
        break;
    default:
        console.log('Usage: node backup-css.js [backup|restore] [backup-dir-for-restore]');
} 