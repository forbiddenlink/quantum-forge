# PowerShell script to clean up "moved to X.css" comment blocks in main.css
# These represent dead code that has been migrated elsewhere

$filePath = "..\styles\main.css"
$content = Get-Content $filePath -Raw

Write-Host "Starting main.css dead code cleanup..."
$originalSize = (Get-Item $filePath).Length
Write-Host "Original size: $([math]::Round($originalSize/1KB, 2)) KB"

# Count migration comments
$migrationComments = ([regex]::Matches($content, "\/\*[^*]*moved to[^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
$handledComments = ([regex]::Matches($content, "\/\*[^*]*handled [^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
$duplicateComments = ([regex]::Matches($content, "\/\*[^*]*duplicate removed[^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count

Write-Host "Found migration-related comments:"
Write-Host "  'moved to' comments: $migrationComments"
Write-Host "  'handled' comments: $handledComments"
Write-Host "  'duplicate removed' comments: $duplicateComments"

# Remove empty selector blocks that just have migration comments
$emptyBlockPattern = "\/\*[^*]*(moved to|handled by|duplicate removed)[^*]*\*\/\s*\n"
$content = $content -replace $emptyBlockPattern, ""

# Remove standalone migration comments
$migrationPattern = "\/\*[^*]*(moved to|handled by|duplicate removed|consolidated in)[^*]*\*\/\s*"
$content = $content -replace $migrationPattern, ""

# Remove empty lines left behind (but preserve intentional spacing)
$content = $content -replace "\n\s*\n\s*\n", "`n`n"

# Remove redundant spacing
$content = $content -replace "\n\s*\n\s*\n\s*\n", "`n`n"

# Save the file
Set-Content $filePath $content -NoNewline

$newSize = (Get-Item $filePath).Length
$reduction = $originalSize - $newSize
Write-Host ""
Write-Host "Dead code cleanup completed!"
Write-Host "New file size: $([math]::Round($newSize/1KB, 2)) KB"
Write-Host "Size reduction: $([math]::Round($reduction/1KB, 2)) KB ($([math]::Round(($reduction/$originalSize)*100, 1))%)"

# Count remaining comments
$newContent = Get-Content $filePath -Raw
$newMigrationComments = ([regex]::Matches($newContent, "\/\*[^*]*moved to[^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
$newHandledComments = ([regex]::Matches($newContent, "\/\*[^*]*handled [^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
$newDuplicateComments = ([regex]::Matches($newContent, "\/\*[^*]*duplicate removed[^*]*\*\/", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count

Write-Host ""
Write-Host "Remaining migration comments:"
Write-Host "  'moved to' comments: $newMigrationComments (removed: $($migrationComments - $newMigrationComments))"
Write-Host "  'handled' comments: $newHandledComments (removed: $($handledComments - $newHandledComments))"
Write-Host "  'duplicate removed' comments: $newDuplicateComments (removed: $($duplicateComments - $newDuplicateComments))"
