Write-Host "=== CSS Health Check ===" -ForegroundColor Green

# 1. Check critical files exist
$criticalFiles = @(
    "../styles/imports.css",
    "../styles/critical.css", 
    "../styles/main.css",
    "../styles/animations.css"
)

Write-Host "Checking critical files..." -ForegroundColor Cyan
$allGood = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $($file -replace '../styles/', '')" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $($file -replace '../styles/', '')" -ForegroundColor Red
        $allGood = $false
    }
}

# 2. Check duplicate count
Write-Host "`nChecking duplicate count..." -ForegroundColor Cyan
try {
    $output = & node find-duplicates.js
    if ($output -match "Found (\d+) duplicate") {
        $count = $matches[1]
        Write-Host "📊 Current duplicates: $count" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️ Could not run duplicate detection" -ForegroundColor Yellow
}

# 3. Check file sizes
Write-Host "`nChecking file sizes..." -ForegroundColor Cyan
$cssFiles = Get-ChildItem "../styles/*.css"
$totalSize = 0
foreach ($file in $cssFiles) {
    $sizeKB = [math]::Round($file.Length / 1024, 1)
    $totalSize += $sizeKB
    if ($sizeKB -gt 100) {
        Write-Host "⚠️ Large file: $($file.Name) ($sizeKB KB)" -ForegroundColor Yellow
    }
}
Write-Host "📏 Total CSS size: $([math]::Round($totalSize, 1)) KB" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "`n✅ CSS structure is healthy" -ForegroundColor Green
} else {
    Write-Host "`n❌ Issues detected above" -ForegroundColor Red
}
