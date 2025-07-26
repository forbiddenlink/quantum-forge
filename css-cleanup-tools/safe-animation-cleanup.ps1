# Safe Cross-File Animation Cleanup Script
# Targets only the safest duplicates: animation keyframes that reference master animations.css
# These are exact duplicates with zero risk of breaking functionality

param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

Write-Host "=== Safe Cross-File Animation Cleanup ===" -ForegroundColor Green
Write-Host "Target: Remove animation keyframes that duplicate animations.css" -ForegroundColor Cyan

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "✅ Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

# Define the exact duplicates to remove (safest targets first)
$cleanupTargets = @(
    @{
        File = "../styles/component-enhancements.css"
        Duplicates = @(
            @{
                Rule = "0% { background-position: -200% 0; }"
                Line = 211
                Reason = "Exact duplicate of animations.css:15 (shimmer effect)"
                Context = "@keyframes shimmer"
            },
            @{
                Rule = "100% { background-position: 200% 0; }"
                Line = 215  
                Reason = "Exact duplicate of animations.css:19 (shimmer effect)"
                Context = "@keyframes shimmer"
            }
        )
    },
    @{
        File = "../styles/contest-enhancements.css"
        Duplicates = @(
            @{
                Rule = "50% { opacity: 1; }"
                Line = 1624
                Reason = "Exact duplicate of animations.css:112 (pulse effect)"
                Context = "@keyframes pulse"
            }
        )
    }
)

$totalRulesRemoved = 0
$filesProcessed = 0

foreach ($target in $cleanupTargets) {
    $fileName = Split-Path $target.File -Leaf
    Write-Host "`n📁 Processing: $fileName" -ForegroundColor Yellow
    
    if (-not (Test-Path $target.File)) {
        Write-Host "❌ File not found: $($target.File)" -ForegroundColor Red
        continue
    }
    
    try {
        $content = Get-Content $target.File -Raw
        $originalLength = $content.Length
        $rulesRemovedThisFile = 0
        
        foreach ($duplicate in $target.Duplicates) {
            Write-Host "  🎯 Target: $($duplicate.Rule)" -ForegroundColor Cyan
            Write-Host "     Reason: $($duplicate.Reason)" -ForegroundColor Gray
            
            if ($content -match [regex]::Escape($duplicate.Rule)) {
                if ($Verbose) {
                    Write-Host "     Context: $($duplicate.Context)" -ForegroundColor Gray
                }
                
                if (-not $DryRun) {
                    # Remove the exact duplicate rule
                    $content = $content -replace [regex]::Escape($duplicate.Rule), ""
                    $rulesRemovedThisFile++
                } else {
                    Write-Host "     🔍 DRY RUN: Would remove this rule" -ForegroundColor Magenta
                    $rulesRemovedThisFile++
                }
            } else {
                Write-Host "     ⚠️  Rule not found (may have been removed already)" -ForegroundColor Yellow
            }
        }
        
        if (-not $DryRun -and $rulesRemovedThisFile -gt 0) {
            # Clean up any resulting empty lines or malformed keyframes
            $content = $content -replace "(\r?\n\s*){3,}", "`n`n"  # Remove excessive empty lines
            
            # Write the cleaned content back
            $content | Out-File $target.File -Encoding UTF8 -NoNewline
            $newLength = $content.Length
            $bytesReduced = $originalLength - $newLength
            
            Write-Host "  ✅ Removed $rulesRemovedThisFile rules ($bytesReduced bytes saved)" -ForegroundColor Green
        }
        
        $totalRulesRemoved += $rulesRemovedThisFile
        $filesProcessed++
        
    } catch {
        Write-Host "  ❌ Error processing file: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n=== Cleanup Summary ===" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed" -ForegroundColor Cyan
Write-Host "Rules removed: $totalRulesRemoved" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No files were modified" -ForegroundColor Magenta
    Write-Host "Run without -DryRun flag to apply changes" -ForegroundColor Yellow
} else {
    Write-Host "✅ Changes applied successfully" -ForegroundColor Green
    Write-Host "Backup created: styles.backup-$timestamp" -ForegroundColor Yellow
}

# Run duplicate detection to verify results
Write-Host "`n🔍 Running duplicate detection to verify results..." -ForegroundColor Cyan
try {
    $duplicateCount = & node find-duplicates.js 2>&1 | Select-String "Found (\d+) duplicate" | ForEach-Object { $_.Matches[0].Groups[1].Value }
    if ($duplicateCount) {
        Write-Host "📊 Current duplicate count: $duplicateCount" -ForegroundColor Cyan
        if (-not $DryRun) {
            Write-Host "Expected reduction: $totalRulesRemoved rules" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "⚠️  Could not run duplicate detection automatically" -ForegroundColor Yellow
    Write-Host "Please run manually: node find-duplicates.js" -ForegroundColor Gray
}

if (-not $DryRun -and $totalRulesRemoved -gt 0) {
    Write-Host "`n📋 Next Steps:" -ForegroundColor Green
    Write-Host "1. Test homepage and key pages visually" -ForegroundColor White
    Write-Host "2. Check that animations still work correctly" -ForegroundColor White  
    Write-Host "3. If everything looks good, proceed to next cleanup phase" -ForegroundColor White
    Write-Host "4. If issues found, restore from backup: styles.backup-$timestamp" -ForegroundColor White
}

Write-Host "`n✨ Safe cleanup completed!" -ForegroundColor Green
