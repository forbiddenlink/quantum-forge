# PowerShell script to consolidate duplicate animation keyframes
# This will replace duplicate animation definitions with references to master definitions in animations.css

$welcomeFile = "..\styles\welcome-section.css"
$taskFile = "..\styles\enhanced-task-system.css"

Write-Host "Starting animation keyframe consolidation..."

# Process welcome-section.css
$content = Get-Content $welcomeFile -Raw
$originalSize = (Get-Item $welcomeFile).Length
Write-Host "Processing welcome-section.css - Original size: $([math]::Round($originalSize/1KB, 2)) KB"

# Count duplicate keyframes
$iconFloatCount = ([regex]::Matches($content, "@keyframes iconFloat")).Count
$aiPulseCount = ([regex]::Matches($content, "@keyframes aiPulse")).Count
$livePulseCount = ([regex]::Matches($content, "@keyframes livePulse")).Count

Write-Host "Found duplicate @keyframes definitions:"
Write-Host "  @keyframes iconFloat: $iconFloatCount"
Write-Host "  @keyframes aiPulse: $aiPulseCount"
Write-Host "  @keyframes livePulse: $livePulseCount"

# Replace animation references with master names
$content = $content -replace "animation:\s*iconFloat\s+", "animation: float "
$content = $content -replace "animation:\s*aiPulse\s+", "animation: pulse "
$content = $content -replace "animation:\s*livePulse\s+", "animation: pulse "

# Remove duplicate @keyframes definitions (keep the animation references, just remove the definitions)
$iconFloatPattern = "@keyframes iconFloat\s*\{[^}]*\}[\s\n]*"
$content = $content -replace $iconFloatPattern, "/* iconFloat keyframes moved to animations.css as 'float' */`n"

$aiPulsePattern = "@keyframes aiPulse\s*\{[^}]*\}[\s\n]*"
$content = $content -replace $aiPulsePattern, "/* aiPulse keyframes moved to animations.css as 'pulse' */`n"

$livePulsePattern = "@keyframes livePulse\s*\{[^}]*\}[\s\n]*"
$content = $content -replace $livePulsePattern, "/* livePulse keyframes moved to animations.css as 'pulse' */`n"

# Save welcome-section.css
Set-Content $welcomeFile $content -NoNewline
$newSize = (Get-Item $welcomeFile).Length
$reduction = $originalSize - $newSize
Write-Host "welcome-section.css updated: $([math]::Round($newSize/1KB, 2)) KB (reduced by $([math]::Round($reduction/1KB, 2)) KB)"

# Process enhanced-task-system.css
$taskContent = Get-Content $taskFile -Raw
$taskOriginalSize = (Get-Item $taskFile).Length
Write-Host ""
Write-Host "Processing enhanced-task-system.css - Original size: $([math]::Round($taskOriginalSize/1KB, 2)) KB"

# Replace shimmer animation references
$taskContent = $taskContent -replace "animation:\s*confidenceShimmer\s+", "animation: shimmer "
$taskContent = $taskContent -replace "animation:\s*progressShimmer\s+", "animation: shimmer "

# Save enhanced-task-system.css
Set-Content $taskFile $taskContent -NoNewline
$taskNewSize = (Get-Item $taskFile).Length
$taskReduction = $taskOriginalSize - $taskNewSize
Write-Host "enhanced-task-system.css updated: $([math]::Round($taskNewSize/1KB, 2)) KB (reduced by $([math]::Round($taskReduction/1KB, 2)) KB)"

Write-Host ""
Write-Host "Animation consolidation completed!"
Write-Host "Total size reduction: $([math]::Round(($reduction + $taskReduction)/1KB, 2)) KB"

# Verify changes
$newContent = Get-Content $welcomeFile -Raw
$newIconFloatCount = ([regex]::Matches($newContent, "@keyframes iconFloat")).Count
$newAiPulseCount = ([regex]::Matches($newContent, "@keyframes aiPulse")).Count
$newLivePulseCount = ([regex]::Matches($newContent, "@keyframes livePulse")).Count

Write-Host ""
Write-Host "Verification - Remaining @keyframes in welcome-section.css:"
Write-Host "  @keyframes iconFloat: $newIconFloatCount (removed: $($iconFloatCount - $newIconFloatCount))"
Write-Host "  @keyframes aiPulse: $newAiPulseCount (removed: $($aiPulseCount - $newAiPulseCount))"
Write-Host "  @keyframes livePulse: $newLivePulseCount (removed: $($livePulseCount - $newLivePulseCount))"
