# Enhanced keyframe cleanup script for the remaining 3 broken blocks

$filePath = "..\styles\welcome-section.css"
$content = Get-Content $filePath -Raw

Write-Host "Enhanced keyframe cleanup..."
$originalSize = (Get-Item $filePath).Length
Write-Host "Starting size: $([math]::Round($originalSize/1KB, 2)) KB"

# More aggressive pattern to catch any remaining orphaned keyframe content
# Find and remove any standalone percentage blocks that aren't part of proper @keyframes
$orphanedKeyframePattern = "(?<!@keyframes [^{]*\{[^}]*)\n\s*\d+%\s*\{\s*[^}]*\}\s*(?=\n)"
$content = $content -replace $orphanedKeyframePattern, ""

# Remove any lingering comments about moved keyframes followed by orphaned content
$commentWithOrphanPattern = "\/\*[^*]*keyframes moved[^*]*\*\/\s*\n\s*\d+%\s*\{[^}]*\}"
$content = $content -replace $commentWithOrphanPattern, "/* Animation consolidated in animations.css */"

# Clean up excessive blank lines again
$content = $content -replace "\n\s*\n\s*\n\s*\n", "`n`n"
$content = $content -replace "\n\s*\n\s*\n", "`n`n"

# Save the file
Set-Content $filePath $content -NoNewline

$newSize = (Get-Item $filePath).Length
$reduction = $originalSize - $newSize
Write-Host ""
Write-Host "Enhanced cleanup completed!"
Write-Host "New file size: $([math]::Round($newSize/1KB, 2)) KB"
Write-Host "Additional reduction: $([math]::Round($reduction/1KB, 2)) KB"

# Check for any remaining issues
$newContent = Get-Content $filePath -Raw
$orphanedPercentages = ([regex]::Matches($newContent, "\n\s*\d+%\s*\{")).Count
Write-Host "Remaining orphaned percentage blocks: $orphanedPercentages"
