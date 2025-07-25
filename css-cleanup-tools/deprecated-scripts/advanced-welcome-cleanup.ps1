# Improved PowerShell script to clean up remaining repetitive patterns in welcome-section.css

$filePath = "..\styles\welcome-section.css"
$content = Get-Content $filePath -Raw

Write-Host "Starting advanced cleanup of welcome-section.css..."
$originalSize = (Get-Item $filePath).Length
Write-Host "Original size: $([math]::Round($originalSize/1KB, 2)) KB"

# Count different types of patterns
$primaryCount = ([regex]::Matches($content, "--primary-50: rgba\(255, 255, 255, 0\.1\) !important;")).Count
$primaryComboCount = ([regex]::Matches($content, "--primary-300: rgba\(255, 255, 255, 0\.3\) !important;")).Count
$hoverCount = ([regex]::Matches($content, "--bg-hover: rgba\(255, 255, 255, 0\.2\) !important;")).Count

Write-Host "Found patterns:"
Write-Host "  --primary-50 instances: $primaryCount"
Write-Host "  --primary-300 instances: $primaryComboCount"  
Write-Host "  --bg-hover instances: $hoverCount"

# Replace individual variable declarations with consolidated comments
$content = $content -replace "    --primary-50: rgba\(255, 255, 255, 0\.1\) !important;\s*\n", "    /* primary-50: Use .welcome-white-text-override */`n"
$content = $content -replace "    --primary-300: rgba\(255, 255, 255, 0\.3\) !important;\s*\n", "    /* primary-300: Use .welcome-white-text-override */`n"
$content = $content -replace "    --primary-600: white !important;\s*\n", "    /* primary-600: Use .welcome-white-text-override */`n"
$content = $content -replace "    --bg-hover: rgba\(255, 255, 255, 0\.2\) !important;\s*\n", "    /* bg-hover: Use .welcome-white-text-override */`n"

# Replace empty/minimal CSS blocks
$content = $content -replace "\{\s*\/\*[^}]*\*\/\s*\}", "{ /* Variables consolidated - use .welcome-white-text-override class */ }"

# Replace remaining triple variable patterns
$triplePattern = "    \/\* primary-50: Use \.welcome-white-text-override \*\/\s*\n\s*\/\* primary-300: Use \.welcome-white-text-override \*\/\s*\n\s*\/\* primary-600: Use \.welcome-white-text-override \*\/"
$content = $content -replace $triplePattern, "    /* All primary variables: Use .welcome-white-text-override class */"

# Clean up consecutive consolidated comments
$content = $content -replace "(    \/\* [^*]* \*\/\s*\n){2,}", "    /* Multiple variables consolidated: Use .welcome-white-text-override class */`n"

# Save the file
Set-Content $filePath $content -NoNewline

$newSize = (Get-Item $filePath).Length
$reduction = $originalSize - $newSize
Write-Host ""
Write-Host "Cleanup completed!"
Write-Host "New file size: $([math]::Round($newSize/1KB, 2)) KB"
Write-Host "Size reduction: $([math]::Round($reduction/1KB, 2)) KB ($([math]::Round(($reduction/$originalSize)*100, 1))%)"

# Count remaining patterns
$newContent = Get-Content $filePath -Raw
$newPrimaryCount = ([regex]::Matches($newContent, "--primary-50: rgba\(255, 255, 255, 0\.1\) !important;")).Count
$newPrimaryComboCount = ([regex]::Matches($newContent, "--primary-300: rgba\(255, 255, 255, 0\.3\) !important;")).Count
$newHoverCount = ([regex]::Matches($newContent, "--bg-hover: rgba\(255, 255, 255, 0\.2\) !important;")).Count

Write-Host ""
Write-Host "Remaining patterns:"
Write-Host "  --primary-50 instances: $newPrimaryCount (removed: $($primaryCount - $newPrimaryCount))"
Write-Host "  --primary-300 instances: $newPrimaryComboCount (removed: $($primaryComboCount - $newPrimaryComboCount))"
Write-Host "  --bg-hover instances: $newHoverCount (removed: $($hoverCount - $newHoverCount))"
