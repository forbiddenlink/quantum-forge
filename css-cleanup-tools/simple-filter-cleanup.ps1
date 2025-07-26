param(
    [switch]$DryRun = $false
)

Write-Host "=== Filter Button Block Cleanup ===" -ForegroundColor Green

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

# Target file to clean (remove duplicates from)
$targetFile = "../styles/enhanced-task-system.css"
$fileName = Split-Path $targetFile -Leaf

Write-Host "Processing: $fileName" -ForegroundColor Cyan

if (Test-Path $targetFile) {
    $content = Get-Content $targetFile -Raw
    $originalLength = $content.Length
    
    # Define the specific multi-line blocks to remove
    $filterBtnBlock = "\.filter-btn \{\s*background: var\(--component-bg\);\s*backdrop-filter: blur\(10px\);\s*-webkit-backdrop-filter: blur\(10px\);\s*border: 1px solid var\(--component-border\);\s*color: var\(--welcome-text\);\s*padding: var\(--space-2\) var\(--space-4\);\s*border-radius: var\(--radius-lg\);\s*font-size: var\(--font-size-sm\);\s*font-weight: 500;\s*transition: all var\(--duration-normal\) var\(--ease-spring\);\s*\}"
    
    $hoverBlock = "\.filter-btn:hover \{\s*background: var\(--component-hover-bg\);\s*border-color: var\(--component-hover-border\);\s*transform: translateY\(-1px\);\s*\}"
    
    $activeBlock = "\.filter-btn\.active \{\s*background: linear-gradient\(135deg, var\(--primary-500\), var\(--primary-600\)\);\s*border: none;\s*color: white;\s*\}"
    
    $patterns = @($filterBtnBlock, $hoverBlock, $activeBlock)
    $totalRemoved = 0
    
    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($matches.Count -gt 0) {
            Write-Host "  Found $($matches.Count) filter-btn patterns" -ForegroundColor Yellow
            
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
    
    if (-not $DryRun -and $totalRemoved -gt 0) {
        Write-Host "`nRunning duplicate check..." -ForegroundColor Cyan
        & node find-duplicates.js | Select-String "Found.*duplicate"
    }
} else {
    Write-Host "  File not found: $fileName" -ForegroundColor Red
}

if ($DryRun) {
    Write-Host "`nDRY RUN - No changes made" -ForegroundColor Magenta
}
