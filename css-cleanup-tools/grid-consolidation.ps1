param(
    [switch]$DryRun = $false
)

Write-Host "=== Safe Grid Layout Consolidation ===" -ForegroundColor Green
Write-Host "Consolidating .analytics-grid responsive patterns" -ForegroundColor Cyan

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

$totalRemoved = 0

# Define the master grid pattern to consolidate
$masterGridPattern = @{
    Base = ".analytics-grid {`n    display: grid;`n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`n    gap: var(--space-4);`n}"
    Mobile = "@media (max-width: 768px) {`n    .analytics-grid {`n        grid-template-columns: 1fr;`n    }`n}"
    Tablet = "@media (min-width: 1024px) {`n    .analytics-grid {`n        grid-template-columns: repeat(3, 1fr);`n    }`n}"
    Desktop = "@media (min-width: 1280px) {`n    .analytics-grid {`n        grid-template-columns: repeat(4, 1fr);`n    }`n}"
}

# Files to clean (remove grid patterns from these)
$filesToClean = @(
    "../styles/enhanced-task-system.css",
    "../styles/team.css"
)

Write-Host "`n1. Cleaning duplicate grid patterns..." -ForegroundColor Cyan

foreach ($file in $filesToClean) {
    $fileName = Split-Path $file -Leaf
    Write-Host "  Processing: $fileName" -ForegroundColor Yellow
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $removed = 0
        
        # Remove specific duplicate patterns
        $patterns = @(
            ".analytics-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(200px,\s*1fr\)\);\s*gap:\s*var\(--space-4\);\s*\}",
            "@media\s*\([^)]*\)\s*\{\s*.analytics-grid\s*\{\s*grid-template-columns:\s*1fr;\s*\}\s*\}",
            "@media\s*\([^)]*\)\s*\{\s*.analytics-grid\s*\{\s*grid-template-columns:\s*repeat\(3,\s*1fr\);\s*\}\s*\}",
            "@media\s*\([^)]*\)\s*\{\s*.analytics-grid\s*\{\s*grid-template-columns:\s*repeat\(4,\s*1fr\);\s*\}\s*\}"
        )
        
        foreach ($pattern in $patterns) {
            $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
            if ($matches.Count -gt 0) {
                Write-Host "    Found $($matches.Count) matches for grid pattern" -ForegroundColor Gray
                
                if ($DryRun) {
                    Write-Host "    DRY RUN: Would remove $($matches.Count) grid patterns" -ForegroundColor Magenta
                    $removed += $matches.Count
                } else {
                    $content = [regex]::Replace($content, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
                    $removed += $matches.Count
                    Write-Host "    Removed $($matches.Count) grid patterns" -ForegroundColor Green
                }
            }
        }
        
        if (-not $DryRun -and $removed -gt 0) {
            # Clean up extra whitespace
            $content = $content -replace "(\r?\n\s*){3,}", "`n`n"
            $content | Out-File $file -Encoding UTF8 -NoNewline
        }
        
        $totalRemoved += $removed
        
        if ($removed -gt 0) {
            Write-Host "  $fileName: $removed patterns removed" -ForegroundColor Green
        } else {
            Write-Host "  $fileName: No duplicates found" -ForegroundColor Gray
        }
    } else {
        Write-Host "  File not found: $fileName" -ForegroundColor Red
    }
}

# Check if master definition exists in components.css
Write-Host "`n2. Verifying master grid definition..." -ForegroundColor Cyan
$componentsFile = "../styles/components.css"
if (Test-Path $componentsFile) {
    $componentsContent = Get-Content $componentsFile -Raw
    
    if ($componentsContent -match "\.analytics-grid") {
        Write-Host "  ✅ Master .analytics-grid found in components.css" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Master .analytics-grid NOT found in components.css" -ForegroundColor Yellow
        Write-Host "  📝 Consider adding master definition to components.css" -ForegroundColor Cyan
    }
} else {
    Write-Host "  ❌ components.css not found" -ForegroundColor Red
}

# Summary
Write-Host "`n=== Grid Consolidation Summary ===" -ForegroundColor Green
Write-Host "Grid patterns processed: $totalRemoved" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "DRY RUN - No files modified" -ForegroundColor Magenta
    Write-Host "Run without -DryRun to apply changes" -ForegroundColor Yellow
} else {
    if ($totalRemoved -gt 0) {
        Write-Host "Changes applied successfully!" -ForegroundColor Green
        Write-Host "Backup saved as: styles.backup-$timestamp" -ForegroundColor Yellow
        
        # Run duplicate detection
        Write-Host "`nRunning duplicate detection..." -ForegroundColor Cyan
        try {
            & node find-duplicates.js | Select-String "Found.*duplicate"
        } catch {
            Write-Host "Could not run duplicate detection - please run manually" -ForegroundColor Yellow
        }
        
        Write-Host "`n📋 Next Steps:" -ForegroundColor Green
        Write-Host "1. Test responsive grid layouts on different screen sizes" -ForegroundColor White
        Write-Host "2. Verify analytics dashboards display correctly" -ForegroundColor White
        Write-Host "3. If all good, proceed to next cleanup phase" -ForegroundColor White
    } else {
        Write-Host "No grid duplicates found - may have been cleaned already" -ForegroundColor Green
    }
}
