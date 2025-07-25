# PowerShell script to replace repetitive CSS variable patterns in welcome-section.css
# This will help consolidate the 20+ instances of repeated variable declarations

$filePath = "..\styles\welcome-section.css"
$content = Get-Content $filePath -Raw

# Count original instances
$originalCount = ([regex]::Matches($content, "--text-primary:\s*white\s*!important;")).Count
Write-Host "Original --text-primary: white !important; instances: $originalCount"

# Replace the repetitive variable override blocks with consolidated comments
# Pattern 1: Replace blocks with just --text-primary
$pattern1 = "    --text-primary: white !important;\s*\n"
$replacement1 = "    /* Consolidated: Use .welcome-white-text-override class on parent element */`n"
$content = $content -replace $pattern1, $replacement1

# Pattern 2: Replace blocks with multiple variables
$pattern2 = "    --text-primary: white !important;\s*\n\s*--text-secondary: white !important;\s*\n\s*--text-tertiary: white !important;\s*\n\s*color: white !important;"
$replacement2 = "    /* Consolidated: Use .welcome-white-text-override class on parent element */"
$content = $content -replace $pattern2, $replacement2

# Pattern 3: Replace the full variable override blocks
$pattern3 = "    --primary-50: rgba\(255, 255, 255, 0\.1\) !important;\s*\n\s*--primary-300: rgba\(255, 255, 255, 0\.3\) !important;\s*\n\s*--primary-600: white !important;\s*\n\s*--text-primary: white !important;\s*\n\s*--bg-hover: rgba\(255, 255, 255, 0\.2\) !important;"
$replacement3 = "    /* Consolidated: All variables moved to .welcome-white-text-override class */"
$content = $content -replace $pattern3, $replacement3

# Count remaining instances  
$newCount = ([regex]::Matches($content, "--text-primary:\s*white\s*!important;")).Count
Write-Host "Remaining --text-primary: white !important; instances: $newCount"
Write-Host "Removed: $($originalCount - $newCount) instances"

# Save the file
Set-Content $filePath $content -NoNewline
Write-Host "File updated successfully!"

# Calculate size reduction
$originalSize = (Get-Item $filePath).Length
Write-Host "New file size: $([math]::Round($originalSize/1KB, 2)) KB"
