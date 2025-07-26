# Conservative CSS Duplicate Analysis
# Examines the exact content around duplicates for safe removal

$mainCssPath = "..\styles\main.css"
$lines = Get-Content $mainCssPath

Write-Host "🔍 Analyzing duplicate keyframes..." -ForegroundColor Cyan

# Function to show context around a line
function Show-Context($lineNum, $context = 3) {
    $start = [math]::Max(0, $lineNum - $context - 1)
    $end = [math]::Min($lines.Length - 1, $lineNum + $context - 1)
    
    Write-Host "`n--- Context around line $lineNum ---" -ForegroundColor Yellow
    for ($i = $start; $i -le $end; $i++) {
        $marker = if ($i -eq $lineNum - 1) { ">>>" } else { "   " }
        Write-Host "$marker $($i+1): $($lines[$i])"
    }
}

# Check expandIn duplicates
$expandInLines = @(2138, 9888, 19663, 27413)
Write-Host "`n📍 ExpandIn keyframes analysis:" -ForegroundColor Green

foreach ($lineNum in $expandInLines) {
    Show-Context $lineNum 2
}

Write-Host "`n📊 File statistics:" -ForegroundColor Cyan
Write-Host "   Total lines: $($lines.Count)"
Write-Host "   File size: $([math]::Round((Get-Item $mainCssPath).Length/1KB,2)) KB"
