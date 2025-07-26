param(
    [switch]$DryRun = $false
)

Write-Host "=== Grid Layout Consolidation ===" -ForegroundColor Green

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

$totalRemoved = 0

# Target specific duplicate analytics-grid patterns
$patterns = @(
    "\.analytics-grid \{\s*grid-template-columns: repeat\(3, 1fr\);\s*\}",
    "\.analytics-grid \{\s*grid-template-columns: repeat\(4, 1fr\);\s*\}",
    "\.analytics-grid \{\s*grid-template-columns: 1fr;\s*\}"
)

$files = @(
    "../styles/enhanced-task-system.css",
    "../styles/team.css"
)

foreach ($file in $files) {
    $fileName = Split-Path $file -Leaf
    Write-Host "Processing: $fileName" -ForegroundColor Cyan
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $fileRemoved = 0
        
        foreach ($pattern in $patterns) {
            $matches = [regex]::Matches($content, $pattern)
            if ($matches.Count -gt 0) {
                Write-Host "  Found $($matches.Count) grid patterns" -ForegroundColor Yellow
                
                if ($DryRun) {
                    Write-Host "  DRY RUN: Would remove" -ForegroundColor Magenta
                } else {
                    $content = [regex]::Replace($content, $pattern, "")
                    Write-Host "  Removed!" -ForegroundColor Green
                }
                $fileRemoved += $matches.Count
            }
        }
        
        if (-not $DryRun -and $fileRemoved -gt 0) {
            $content | Out-File $file -Encoding UTF8 -NoNewline
        }
        
        $totalRemoved += $fileRemoved
        Write-Host "  $fileName`: $fileRemoved patterns processed" -ForegroundColor White
    }
}

Write-Host "Total patterns processed: $totalRemoved" -ForegroundColor Green

if (-not $DryRun -and $totalRemoved -gt 0) {
    Write-Host "Running duplicate check..." -ForegroundColor Cyan
    & node find-duplicates.js | Select-String "Found.*duplicate"
}
