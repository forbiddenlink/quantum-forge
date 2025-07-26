# Safe CSS Duplicate Removal Script
# This script removes exact duplicate keyframes from main.css

$mainCssPath = "..\styles\main.css"
$backupPath = "..\styles\main.css.backup-" + (Get-Date -Format 'yyyy-MM-dd-HH-mm-ss')

Write-Host "🛡️ Creating backup..." -ForegroundColor Green
Copy-Item $mainCssPath $backupPath

Write-Host "📊 Current file size: $([math]::Round((Get-Item $mainCssPath).Length/1KB,2)) KB" -ForegroundColor Cyan

# Read all lines
$lines = Get-Content $mainCssPath

Write-Host "📋 Total lines: $($lines.Count)" -ForegroundColor Cyan

# Target specific duplicate keyframes by line numbers (from our analysis)
$duplicatesToRemove = @(
    @{Name="expandIn"; StartLine=2138; EndLine=2148},  # First duplicate
    @{Name="expandIn"; StartLine=9888; EndLine=9898},  # Second duplicate  
    @{Name="expandIn"; StartLine=19663; EndLine=19673}, # Third duplicate
    @{Name="float"; StartLine=5535; EndLine=5544},     # First float duplicate
    @{Name="float"; StartLine=12930; EndLine=12939},   # Second float duplicate
    @{Name="float"; StartLine=23060; EndLine=23069}    # Third float duplicate
)

# Sort by line number descending to avoid index shifting
$duplicatesToRemove = $duplicatesToRemove | Sort-Object StartLine -Descending

Write-Host "🎯 Removing duplicates..." -ForegroundColor Yellow

foreach ($duplicate in $duplicatesToRemove) {
    $startIdx = $duplicate.StartLine - 1  # Convert to 0-based index
    $endIdx = $duplicate.EndLine - 1
    
    # Verify we're targeting the right keyframe
    $keyframeLine = $lines[$startIdx]
    if ($keyframeLine -match "@keyframes $($duplicate.Name)") {
        Write-Host "   ✅ Removing $($duplicate.Name) at lines $($duplicate.StartLine)-$($duplicate.EndLine)" -ForegroundColor Green
        
        # Remove the lines (in reverse order to maintain indices)
        for ($i = $endIdx; $i -ge $startIdx; $i--) {
            $lines = $lines[0..($i-1)] + $lines[($i+1)..($lines.Length-1)]
        }
    } else {
        Write-Host "   ⚠️ Skipping $($duplicate.Name) - line content doesn't match: $keyframeLine" -ForegroundColor Red
    }
}

# Write back to file
$lines | Set-Content $mainCssPath -Encoding UTF8

$newSize = [math]::Round((Get-Item $mainCssPath).Length/1KB,2)
$savings = [math]::Round(815.94 - $newSize, 2)

Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host "📊 New file size: $newSize KB (saved $savings KB)" -ForegroundColor Cyan
Write-Host "🛡️ Backup saved: $backupPath" -ForegroundColor Green
