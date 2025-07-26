param(
    [switch]$DryRun = $false
)

Write-Host "=== Task Card Component Cleanup ===" -ForegroundColor Green

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

$targetFile = "../styles/enhanced-task-system.css"
$fileName = Split-Path $targetFile -Leaf

Write-Host "Processing: $fileName" -ForegroundColor Cyan

if (Test-Path $targetFile) {
    $content = Get-Content $targetFile -Raw
    $originalLength = $content.Length
    
    # Multi-line patterns to remove
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
        $content = $content -replace "(\r?\n\s*){3,}", "`n`n"
        $content | Out-File $targetFile -Encoding UTF8 -NoNewline
        
        $newLength = $content.Length
        $bytesReduced = $originalLength - $newLength
        Write-Host "  Saved $bytesReduced bytes" -ForegroundColor Green
    }
    
    Write-Host "  Total patterns processed: $totalRemoved" -ForegroundColor White
    
    if (-not $DryRun -and $totalRemoved -gt 0) {
        Write-Host "`nRunning duplicate check..." -ForegroundColor Cyan
        & node find-duplicates.js | Select-String "Found.*duplicate"
    }
}

if ($DryRun) {
    Write-Host "`nDRY RUN - No changes made" -ForegroundColor Magenta
}
