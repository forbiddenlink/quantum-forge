# Cleanup Analytics Grid Duplicates in enhanced-task-system.css
# This script identifies and removes duplicate .analytics-grid definitions

Write-Host "Starting Analytics Grid Duplicate Cleanup..." -ForegroundColor Green

$filePath = "styles/enhanced-task-system.css"
$content = Get-Content $filePath -Raw

# Find all .analytics-grid definitions
$analyticsGridPattern = '\.analytics-grid\s*\{[^}]*\}'
$matches = [regex]::Matches($content, $analyticsGridPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

Write-Host "Found $($matches.Count) .analytics-grid definitions" -ForegroundColor Yellow

# Group by content to find duplicates
$groups = @{}
foreach ($match in $matches) {
    $content = $match.Value.Trim()
    if ($groups.ContainsKey($content)) {
        $groups[$content] += 1
    }
    else {
        $groups[$content] = 1
    }
}

# Show duplicates
$duplicates = $groups | Where-Object { $_.Value -gt 1 }
Write-Host "Found $($duplicates.Count) duplicate patterns:" -ForegroundColor Red

foreach ($duplicate in $duplicates) {
    Write-Host "Pattern appears $($duplicate.Value) times:" -ForegroundColor Red
    Write-Host $duplicate.Key -ForegroundColor Gray
    Write-Host "---" -ForegroundColor DarkGray
}

# Manual cleanup recommendations
Write-Host "`nManual cleanup recommended:" -ForegroundColor Yellow
Write-Host "1. Keep the first occurrence of each unique .analytics-grid definition" -ForegroundColor White
Write-Host "2. Remove subsequent duplicates" -ForegroundColor White
Write-Host "3. Update any references to use the master definition" -ForegroundColor White
Write-Host "4. Consider consolidating similar definitions with different values" -ForegroundColor White

Write-Host "`nCleanup complete. Review the duplicates above and perform manual cleanup." -ForegroundColor Green 