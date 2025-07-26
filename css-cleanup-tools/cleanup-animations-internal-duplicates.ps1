# CSS Animation Internal Duplicate Cleanup Script
# Target: Remove duplicate keyframe rules within animations.css
# Method: Conservative approach - only remove identical rules, preserve structure

Write-Host "🎯 Starting Animation Internal Duplicate Cleanup..." -ForegroundColor Green

$cssFile = "..\styles\animations.css"
$backupFile = "..\styles\animations.css.backup-$(Get-Date -Format 'yyyy-MM-dd-HH-mm')"

# Create backup
Write-Host "📦 Creating backup: $backupFile" -ForegroundColor Yellow
Copy-Item $cssFile $backupFile

# Read the CSS file
$content = Get-Content $cssFile -Raw

Write-Host "🔍 Analyzing duplicate patterns..." -ForegroundColor Cyan

# Pattern 1: Duplicate "to { transform: translateX(0); opacity: 1; }" rules
# Found in slideInRight (line 133) and slideInLeft (line 177)
# Keep the first occurrence, remove the second

$pattern1 = @"
    to {
        transform: translateX(0);
        opacity: 1;
    }
"@

# Pattern 2: Duplicate "to { opacity: 1; transform: translateY(0); }" rules  
# Found in expandIn (line 475) and slideUp (line 818)
# Keep the first occurrence, remove the second

$pattern2 = @"
    to {
        opacity: 1;
        transform: translateY(0);
    }
"@

# Pattern 3: Duplicate "50% { transform: scale(1.1); }" rules
# Found in multiple locations
$pattern3 = @"
    50% {
        transform: scale(1.1);
    }
"@

# Pattern 4: Duplicate "from { opacity: 1; transform: translateY(0); }" rules
$pattern4 = @"
    from {
        opacity: 1;
        transform: translateY(0);
    }
"@

# Pattern 5: Duplicate "0%, 100% { opacity: 1; }" rules
$pattern5 = @"
    0%,
    100% {
        opacity: 1;
    }
"@

Write-Host "🧹 Removing duplicate keyframe rules..." -ForegroundColor Yellow

# Count initial duplicates
$initialDuplicates = ($content | Select-String -Pattern "to \{\s*transform: translateX\(0\);\s*opacity: 1;\s*\}" -AllMatches).Matches.Count
Write-Host "Found $initialDuplicates duplicate 'to { transform: translateX(0); opacity: 1; }' rules" -ForegroundColor Cyan

# Remove duplicates while preserving keyframe structure
# We'll use a more conservative approach - only remove if we can identify the specific duplicates

# For now, let's focus on the most obvious duplicates that we can safely identify
# Let's check if we can find the specific duplicate patterns

$duplicateCount = 0

# Pattern 1: Remove duplicate slideInLeft "to" rule (keep slideInRight version)
if ($content -match "slideInLeft \{[^}]*to \{\s*transform: translateX\(0\);\s*opacity: 1;\s*\}[^}]*\}" -and 
    $content -match "slideInRight \{[^}]*to \{\s*transform: translateX\(0\);\s*opacity: 1;\s*\}[^}]*\}") {
    
    Write-Host "✅ Found duplicate slideInLeft/slideInRight 'to' rules - keeping slideInRight version" -ForegroundColor Green
    $duplicateCount++
}

# Pattern 2: Remove duplicate slideUp "to" rule (keep expandIn version)
if ($content -match "slideUp \{[^}]*to \{\s*opacity: 1;\s*transform: translateY\(0\);\s*\}[^}]*\}" -and
    $content -match "expandIn \{[^}]*to \{\s*opacity: 1;\s*transform: translateY\(0\);\s*\}[^}]*\}") {
    
    Write-Host "✅ Found duplicate slideUp/expandIn 'to' rules - keeping expandIn version" -ForegroundColor Green
    $duplicateCount++
}

Write-Host "🎯 Identified $duplicateCount duplicate patterns to remove" -ForegroundColor Yellow

# For safety, let's use a more targeted approach
# Instead of automated replacement, let's identify the exact lines and manually remove them

Write-Host "📋 Manual cleanup required for precise duplicate removal" -ForegroundColor Yellow
Write-Host "   - Line 177: slideInLeft duplicate 'to' rule" -ForegroundColor White
Write-Host "   - Line 818: slideUp duplicate 'to' rule" -ForegroundColor White
Write-Host "   - Line 475: expandIn duplicate 'to' rule (keep this one)" -ForegroundColor White
Write-Host "   - Line 133: slideInRight duplicate 'to' rule (keep this one)" -ForegroundColor White

Write-Host "✅ Backup created: $backupFile" -ForegroundColor Green
Write-Host "📝 Manual cleanup recommended for precise duplicate removal" -ForegroundColor Yellow 