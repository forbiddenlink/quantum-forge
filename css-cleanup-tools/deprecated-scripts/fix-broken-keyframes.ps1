# PowerShell script to fix broken keyframe blocks in welcome-section.css
# Our previous script removed @keyframes declarations but left the content

$filePath = "..\styles\welcome-section.css"
$content = Get-Content $filePath -Raw

Write-Host "Fixing broken keyframe blocks in welcome-section.css..."
$originalSize = (Get-Item $filePath).Length
Write-Host "Original size: $([math]::Round($originalSize/1KB, 2)) KB"

# Count broken keyframe comments
$brokenKeyframes = ([regex]::Matches($content, "\/\* [a-zA-Z]+ keyframes moved to animations\.css")).Count
Write-Host "Found $brokenKeyframes broken keyframe blocks to clean"

# Pattern to match the broken keyframe blocks:
# Comment + orphaned keyframe content
$patternIconFloat = "\/\* iconFloat keyframes moved to animations\.css as 'float' \*\/\s*\n25% \{\s*\n[^}]*\}\s*\n\s*50% \{\s*\n[^}]*\}\s*\n\s*75% \{\s*\n[^}]*\}\s*\n\s*100% \{\s*\n[^}]*\}"

$patternPulse = "\/\* (aiPulse|livePulse) keyframes moved to animations\.css as 'pulse' \*\/\s*\n50% \{\s*\n[^}]*\}"

# Remove the broken iconFloat blocks
$content = $content -replace $patternIconFloat, "/* iconFloat animation consolidated in animations.css */"

# Remove the broken pulse blocks  
$content = $content -replace $patternPulse, "/* Pulse animations consolidated in animations.css */"

# Clean up any remaining orphaned keyframe percentages
$content = $content -replace "\n\s*\d+% \{\s*\n[^}]*\}\s*(?=\n)", ""

# Remove extra blank lines
$content = $content -replace "\n\s*\n\s*\n", "`n`n"

# Save the file
Set-Content $filePath $content -NoNewline

$newSize = (Get-Item $filePath).Length
$reduction = $originalSize - $newSize
Write-Host ""
Write-Host "Keyframe repair completed!"
Write-Host "New file size: $([math]::Round($newSize/1KB, 2)) KB"
Write-Host "Size reduction: $([math]::Round($reduction/1KB, 2)) KB"

# Verify no more broken keyframes
$newContent = Get-Content $filePath -Raw
$remainingBroken = ([regex]::Matches($newContent, "\/\* [a-zA-Z]+ keyframes moved to animations\.css")).Count
Write-Host "Remaining broken keyframe blocks: $remainingBroken"
