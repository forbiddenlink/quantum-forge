param(
    [switch]$DryRun = $false
)

Write-Host "=== Filter Button Consolidation ===" -ForegroundColor Green
Write-Host "Consolidating .filter-btn patterns between files" -ForegroundColor Cyan

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

$totalRemoved = 0

# Define the filter-btn patterns to remove from secondary file
$filterBtnPatterns = @(
    "\.filter-btn\s*\{\s*background:\s*var\(--component-bg\);\s*backdrop-filter:\s*blur\(10px\);\s*-webkit-backdrop-filter:\s*blur\(10px\);\s*border:\s*1px\s*solid\s*var\(--component-border\);\s*color:\s*var\(--welcome-text\);\s*padding:\s*var\(--space-2\)\s*var\(--space-4\);\s*border-radius:\s*var\(--radius-lg\);\s*font-size:\s*var\(--font-size-sm\);\s*font-weight:\s*500;\s*transition:\s*all\s*var\(--duration-normal\)\s*var\(--ease-spring\);\s*\}",
    "\.filter-btn:hover\s*\{\s*background:\s*var\(--component-hover-bg\);\s*border-color:\s*var\(--component-hover-border\);\s*transform:\s*translateY\(-1px\);\s*\}",
    "\.filter-btn\.active\s*\{\s*background:\s*linear-gradient\(135deg,\s*var\(--primary-500\),\s*var\(--primary-600\)\);\s*border:\s*none;\s*color:\s*white;\s*\}"
)

# Remove duplicates from enhanced-task-system.css (keep in enhanced-knowledge-hub.css)
$targetFile = "../styles/enhanced-task-system.css"
$fileName = Split-Path $targetFile -Leaf

Write-Host "Processing: $fileName" -ForegroundColor Cyan

if (Test-Path $targetFile) {
    $content = Get-Content $targetFile -Raw
    $removed = 0
    
    foreach ($pattern in $filterBtnPatterns) {
        # Use a simpler approach - look for specific text blocks
        if ($pattern -match "filter-btn\s*\\{") {
            # Base filter-btn
            $searchText = ".filter-btn { background: var(--component-bg); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid var(--component-border); color: var(--welcome-text); padding: var(--space-2) var(--space-4); border-radius: var(--radius-lg); font-size: var(--font-size-sm); font-weight: 500; transition: all var(--duration-normal) var(--ease-spring); }"
        } elseif ($pattern -match "filter-btn:hover") {
            # Hover state
            $searchText = ".filter-btn:hover { background: var(--component-hover-bg); border-color: var(--component-hover-border); transform: translateY(-1px); }"
        } elseif ($pattern -match "filter-btn\\\\.active") {
            # Active state
            $searchText = ".filter-btn.active { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border: none; color: white; }"
        }
        
        if ($content -match [regex]::Escape($searchText)) {
            Write-Host "  Found filter-btn pattern" -ForegroundColor Yellow
            
            if ($DryRun) {
                Write-Host "  DRY RUN: Would remove duplicate" -ForegroundColor Magenta
            } else {
                $content = $content -replace [regex]::Escape($searchText), ""
                Write-Host "  Removed duplicate!" -ForegroundColor Green
            }
            $removed++
        }
    }
    
    if (-not $DryRun -and $removed -gt 0) {
        # Clean up extra whitespace
        $content = $content -replace "(\r?\n\s*){3,}", "`n`n"
        $content | Out-File $targetFile -Encoding UTF8 -NoNewline
    }
    
    $totalRemoved = $removed
    Write-Host "  $fileName`: $removed patterns processed" -ForegroundColor White
} else {
    Write-Host "  File not found: $fileName" -ForegroundColor Red
}

# Verify master definitions still exist in enhanced-knowledge-hub.css
Write-Host "`nVerifying master definitions..." -ForegroundColor Cyan
$masterFile = "../styles/enhanced-knowledge-hub.css"
if (Test-Path $masterFile) {
    $masterContent = Get-Content $masterFile -Raw
    
    if ($masterContent -match "\.filter-btn\s*\{") {
        Write-Host "  ✅ Master .filter-btn found in enhanced-knowledge-hub.css" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Master .filter-btn NOT found!" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ enhanced-knowledge-hub.css not found" -ForegroundColor Red
}

# Summary
Write-Host "`n=== Filter Button Consolidation Summary ===" -ForegroundColor Green
Write-Host "Filter button patterns processed: $totalRemoved" -ForegroundColor Cyan

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
    } else {
        Write-Host "No filter button duplicates found" -ForegroundColor Green
    }
}
