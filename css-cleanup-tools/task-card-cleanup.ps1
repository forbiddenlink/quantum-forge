param(
    [switch]$DryRun = $false
)

Write-Host "=== Task Card Component Cleanup ===" -ForegroundColor Green
Write-Host "Consolidating task card component patterns" -ForegroundColor Cyan

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

# Target specific task card duplicates (remove from enhanced-task-system.css)
$targetFile = "../styles/enhanced-task-system.css"
$fileName = Split-Path $targetFile -Leaf

Write-Host "Processing: $fileName" -ForegroundColor Cyan

if (Test-Path $targetFile) {
    $content = Get-Content $targetFile -Raw
    $originalLength = $content.Length
    
    # Define exact patterns to remove (keep master in components/task-system.css)
    $patterns = @(
        "\.task-card-header \{\s*display: flex;\s*justify-content: space-between;\s*align-items: center;\s*margin-bottom: var\(--space-4\);\s*\}",
        "\.task-card-content \{\s*margin-bottom: var\(--space-4\);\s*\}",
        "\.task-card-progress \{\s*margin-bottom: var\(--space-4\);\s*\}"
    )
    
    $totalRemoved = 0
    
    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($matches.Count -gt 0) {
            Write-Host "  Found $($matches.Count) task card patterns" -ForegroundColor Yellow
            
            if ($DryRun) {
                Write-Host "  DRY RUN: Would remove" -ForegroundColor Magenta
            } else {
                $content = [regex]::Replace($content, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
                Write-Host "  Removed!" -ForegroundColor Green
            }
            $totalRemoved += $matches.Count
        }
    }
    
    if (-not $DryRun -and $totalRemoved -gt 0) {
        # Clean up extra whitespace
        $content = $content -replace "(\r?\n\s*){3,}", "`n`n"
        $content | Out-File $targetFile -Encoding UTF8 -NoNewline
        
        $newLength = $content.Length
        $bytesReduced = $originalLength - $newLength
        Write-Host "  Saved $bytesReduced bytes" -ForegroundColor Green
    }
    
    Write-Host "  Total patterns processed: $totalRemoved" -ForegroundColor White
} else {
    Write-Host "  File not found: $fileName" -ForegroundColor Red
    exit 1
}

# Verify master definitions still exist
Write-Host "`nVerifying master definitions..." -ForegroundColor Cyan
$masterFile = "../styles/components/task-system.css"
if (Test-Path $masterFile) {
    $masterContent = Get-Content $masterFile -Raw
    
    $masterChecks = @(
        @{ Pattern = "\.task-card-header"; Name = "task-card-header" },
        @{ Pattern = "\.task-card-progress"; Name = "task-card-progress" }
    )
    
    foreach ($check in $masterChecks) {
        if ($masterContent -match $check.Pattern) {
            Write-Host "  ✅ Master .$($check.Name) found in components/task-system.css" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️ Master .$($check.Name) NOT found!" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ❌ components/task-system.css not found" -ForegroundColor Red
}

# Summary and duplicate check
Write-Host "`n=== Task Card Cleanup Summary ===" -ForegroundColor Green
Write-Host "Task card patterns processed: $totalRemoved" -ForegroundColor Cyan

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
        
        Write-Host "`n📋 Next Steps:" -ForegroundColor Green
        Write-Host "1. Test task card displays and interactions" -ForegroundColor White
        Write-Host "2. Verify task system functionality" -ForegroundColor White
        Write-Host "3. If all good, proceed to next cleanup phase" -ForegroundColor White
    } else {
        Write-Host "No task card duplicates found" -ForegroundColor Green
    }
}
