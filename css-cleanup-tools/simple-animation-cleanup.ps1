param(
    [switch]$DryRun = $false
)

Write-Host "=== Safe Cross-File Animation Cleanup ===" -ForegroundColor Green

# Create backup first
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
if (-not $DryRun) {
    Write-Host "Creating backup..." -ForegroundColor Yellow
    Copy-Item "../styles" "../styles.backup-$timestamp" -Recurse
    Write-Host "Created backup: styles.backup-$timestamp" -ForegroundColor Green
}

# Define exact duplicates to remove
$targets = @(
    @{
        File = "../styles/component-enhancements.css"
        Rules = @(
            "        background-position: -200% 0;",
            "        background-position: 200% 0;"
        )
        Context = "shimmer animation keyframes"
    },
    @{
        File = "../styles/contest-enhancements.css" 
        Rules = @("        opacity: 1;")
        Context = "pulse animation keyframe (50% keyframe)"
    }
)

$totalRemoved = 0

foreach ($target in $targets) {
    $fileName = Split-Path $target.File -Leaf
    Write-Host "Processing: $fileName" -ForegroundColor Cyan
    
    if (Test-Path $target.File) {
        $content = Get-Content $target.File -Raw
        $removed = 0
        
        foreach ($rule in $target.Rules) {
            if ($content -match [regex]::Escape($rule)) {
                Write-Host "  Found: $rule" -ForegroundColor Yellow
                
                if ($DryRun) {
                    Write-Host "  DRY RUN: Would remove" -ForegroundColor Magenta
                } else {
                    $content = $content -replace [regex]::Escape($rule), ""
                    Write-Host "  Removed!" -ForegroundColor Green
                }
                $removed++
            }
        }
        
        if (-not $DryRun -and $removed -gt 0) {
            $content | Out-File $target.File -Encoding UTF8 -NoNewline
        }
        
        $totalRemoved += $removed
    } else {
        Write-Host "File not found: $fileName" -ForegroundColor Red
    }
}

Write-Host "Summary: $totalRemoved rules processed" -ForegroundColor Green
if ($DryRun) {
    Write-Host "DRY RUN - No changes made" -ForegroundColor Magenta
} else {
    Write-Host "Changes applied" -ForegroundColor Green
}
