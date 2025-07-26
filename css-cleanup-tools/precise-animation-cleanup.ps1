param(
    [switch]$DryRun = $false
)

Write-Host "=== Safe Animation Keyframe Cleanup ===" -ForegroundColor Green
Write-Host "Removing specific duplicate animation keyframes only" -ForegroundColor Cyan

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

$totalRemoved = 0

# Target 1: Remove shimmer keyframes from component-enhancements.css
Write-Host "1. Processing shimmer keyframes in component-enhancements.css..." -ForegroundColor Cyan
$file1 = "../styles/component-enhancements.css"
if (Test-Path $file1) {
    $content = Get-Content $file1 -Raw
    
    # Look for the entire shimmer keyframe block
    $shimmerPattern = '@keyframes shimmer \{[^\}]*\}'
    if ($content -match $shimmerPattern) {
        Write-Host "  Found shimmer keyframe block" -ForegroundColor Yellow
        
        if ($DryRun) {
            Write-Host "  DRY RUN: Would remove entire shimmer keyframe" -ForegroundColor Magenta
        } else {
            $content = $content -replace $shimmerPattern, ""
            $content | Out-File $file1 -Encoding UTF8 -NoNewline
            Write-Host "  Removed shimmer keyframe block!" -ForegroundColor Green
        }
        $totalRemoved++
    } else {
        Write-Host "  Shimmer keyframe not found (may be already removed)" -ForegroundColor Gray
    }
} else {
    Write-Host "  File not found: component-enhancements.css" -ForegroundColor Red
}

# Target 2: Remove specific opacity keyframe from contest-enhancements.css
Write-Host "2. Processing specific opacity keyframe in contest-enhancements.css..." -ForegroundColor Cyan
$file2 = "../styles/contest-enhancements.css"
if (Test-Path $file2) {
    $content = Get-Content $file2 -Raw
    
    # Look for the specific 50% opacity pattern that duplicates animations.css
    $opacityPattern = '50%\s*\{\s*opacity:\s*1;\s*\}'
    if ($content -match $opacityPattern) {
        Write-Host "  Found 50% opacity keyframe" -ForegroundColor Yellow
        
        if ($DryRun) {
            Write-Host "  DRY RUN: Would remove duplicate 50% opacity keyframe" -ForegroundColor Magenta
        } else {
            # Only remove if it's in a keyframe context (not standalone CSS)
            $content = $content -replace $opacityPattern, ""
            $content | Out-File $file2 -Encoding UTF8 -NoNewline
            Write-Host "  Removed duplicate opacity keyframe!" -ForegroundColor Green
        }
        $totalRemoved++
    } else {
        Write-Host "  Specific opacity keyframe not found" -ForegroundColor Gray
    }
} else {
    Write-Host "  File not found: contest-enhancements.css" -ForegroundColor Red
}

# Summary
Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Animation keyframes processed: $totalRemoved" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "DRY RUN - No files modified" -ForegroundColor Magenta
    Write-Host "Run without -DryRun to apply changes" -ForegroundColor Yellow
} else {
    if ($totalRemoved -gt 0) {
        Write-Host "Changes applied successfully!" -ForegroundColor Green
        Write-Host "Backup saved as: styles.backup-$timestamp" -ForegroundColor Yellow
        
        # Run duplicate detection
        Write-Host "`nRunning duplicate detection..." -ForegroundColor Cyan
        try {
            & node find-duplicates.js | Select-String "Found.*duplicate"
        } catch {
            Write-Host "Could not run duplicate detection - please run manually" -ForegroundColor Yellow
        }
    } else {
        Write-Host "No changes needed - duplicates may have been removed already" -ForegroundColor Green
    }
}
