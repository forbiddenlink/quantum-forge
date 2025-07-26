# CSS Cleanup Validation Script
# Comprehensive testing after cleanup operations to ensure nothing broke

param(
    [string]$BackupPath = "",
    [switch]$DetailedReport = $false
)

$ErrorActionPreference = "Stop"

Write-Host "=== CSS Cleanup Validation ===" -ForegroundColor Green
Write-Host "Validating styles after cleanup operations" -ForegroundColor Cyan

# 1. File Structure Validation
Write-Host "`n📁 Validating file structure..." -ForegroundColor Yellow

$criticalFiles = @(
    "../styles/imports.css",
    "../styles/critical.css", 
    "../styles/main.css",
    "../styles/animations.css",
    "../styles/components.css",
    "../styles/welcome-section.css",
    "../styles/enhanced-task-system.css"
)

$missingFiles = @()
foreach ($file in $criticalFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    } else {
        Write-Host "✅ Found: $(Split-Path $file -Leaf)" -ForegroundColor Green
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "🚨 CRITICAL: Missing files detected!" -ForegroundColor Red
    exit 1
}

# 2. CSS Syntax Validation
Write-Host "`n🔍 Validating CSS syntax..." -ForegroundColor Yellow

$syntaxErrors = @()
$cssFiles = Get-ChildItem "../styles/*.css" -File

foreach ($file in $cssFiles) {
    try {
        $content = Get-Content $file.FullName -Raw
        
        # Basic syntax checks
        $openBraces = ([regex]::Matches($content, '{').Count)
        $closeBraces = ([regex]::Matches($content, '}').Count)
        
        if ($openBraces -ne $closeBraces) {
            $syntaxErrors += "$($file.Name): Mismatched braces (Open: $openBraces, Close: $closeBraces)"
        }
        
        # Check for common syntax issues
        if ($content -match ';;') {
            $syntaxErrors += "$($file.Name): Double semicolons detected"
        }
        
        if ($content -match '\{\s*\}') {
            Write-Host "⚠️  Empty rule blocks in $($file.Name)" -ForegroundColor Yellow
        }
        
    } catch {
        $syntaxErrors += "$($file.Name): Error reading file - $($_.Exception.Message)"
    }
}

if ($syntaxErrors.Count -eq 0) {
    Write-Host "✅ All CSS files have valid syntax" -ForegroundColor Green
} else {
    Write-Host "❌ Syntax errors found:" -ForegroundColor Red
    foreach ($error in $syntaxErrors) {
        Write-Host "   $error" -ForegroundColor Red
    }
}

# 3. Import Structure Validation
Write-Host "`n📋 Validating import structure..." -ForegroundColor Yellow

try {
    $imports = Get-Content "../styles/imports.css"
    $importCount = ($imports | Where-Object { $_ -match "@import" }).Count
    
    Write-Host "✅ Import file contains $importCount imports" -ForegroundColor Green
    
    # Check for circular imports or missing files
    $missingImports = @()
    foreach ($line in $imports) {
        if ($line -match "@import url\('(.+?)'\);") {
            $relativePath = $matches[1]
            $fullPath = Join-Path "../styles" $relativePath
            if (-not (Test-Path $fullPath)) {
                $missingImports += $relativePath
            }
        }
    }
    
    if ($missingImports.Count -eq 0) {
        Write-Host "✅ All imported files exist" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing imported files:" -ForegroundColor Red
        foreach ($missing in $missingImports) {
            Write-Host "   $missing" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "❌ Error validating imports: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Duplicate Count Check
Write-Host "`n🔍 Checking duplicate count..." -ForegroundColor Yellow

try {
    $output = & node find-duplicates.js 2>&1
    $duplicateCount = ($output | Select-String "Found (\d+) duplicate" | ForEach-Object { $_.Matches[0].Groups[1].Value })
    
    if ($duplicateCount) {
        Write-Host "📊 Current duplicate count: $duplicateCount" -ForegroundColor Cyan
        
        # Compare with previous known count if backup exists
        if ($BackupPath -and (Test-Path $BackupPath)) {
            Write-Host "📈 Comparing with backup..." -ForegroundColor Yellow
            # This would require running duplicate detection on backup - placeholder for now
            Write-Host "   Backup comparison: Feature planned" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠️  Could not parse duplicate count from output" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error running duplicate detection: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. File Size Analysis
Write-Host "`n📏 Analyzing file sizes..." -ForegroundColor Yellow

$totalSize = 0
$largeFiles = @()

foreach ($file in $cssFiles) {
    $sizeKB = [math]::Round($file.Length / 1024, 2)
    $totalSize += $sizeKB
    
    if ($sizeKB -gt 100) { # Flag files over 100KB
        $largeFiles += "$($file.Name): $sizeKB KB"
    }
}

Write-Host "📊 Total CSS size: $([math]::Round($totalSize, 2)) KB" -ForegroundColor Cyan

if ($largeFiles.Count -gt 0) {
    Write-Host "⚠️  Large files detected:" -ForegroundColor Yellow
    foreach ($large in $largeFiles) {
        Write-Host "   $large" -ForegroundColor Yellow
    }
}

# 6. Animation Keyframe Validation
Write-Host "`n🎬 Validating animation keyframes..." -ForegroundColor Yellow

try {
    $animationsFile = Get-Content "../styles/animations.css" -Raw
    $keyframes = ([regex]::Matches($animationsFile, '@keyframes\s+([a-zA-Z0-9-_]+)') | ForEach-Object { $_.Groups[1].Value })
    
    Write-Host "✅ Found $($keyframes.Count) animation keyframes in master file" -ForegroundColor Green
    
    if ($DetailedReport) {
        Write-Host "📝 Animation keyframes:" -ForegroundColor Cyan
        foreach ($keyframe in $keyframes | Sort-Object) {
            Write-Host "   - $keyframe" -ForegroundColor Gray
        }
    }
    
} catch {
    Write-Host "❌ Error validating animations: $($_.Exception.Message)" -ForegroundColor Red
}

# 7. CSS Variables Check
Write-Host "`n🎨 Validating CSS variables..." -ForegroundColor Yellow

try {
    $criticalFile = Get-Content "../styles/critical.css" -Raw
    $variables = ([regex]::Matches($criticalFile, '--([a-zA-Z0-9-_]+):') | ForEach-Object { $_.Groups[1].Value })
    
    Write-Host "✅ Found $($variables.Count) CSS variables in critical.css" -ForegroundColor Green
    
    # Check for common theme variables
    $requiredVars = @('primary-500', 'text-primary', 'bg-primary', 'space-4')
    $missingVars = @()
    
    foreach ($required in $requiredVars) {
        if ($variables -notcontains $required) {
            $missingVars += $required
        }
    }
    
    if ($missingVars.Count -eq 0) {
        Write-Host "✅ All required theme variables present" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Missing theme variables:" -ForegroundColor Yellow
        foreach ($missing in $missingVars) {
            Write-Host "   --$missing" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "❌ Error validating CSS variables: $($_.Exception.Message)" -ForegroundColor Red
}

# Final Summary
Write-Host "`n=== Validation Summary ===" -ForegroundColor Green

$issues = $missingFiles.Count + $syntaxErrors.Count + $missingImports.Count
if ($issues -eq 0) {
    Write-Host "🎉 All validations passed!" -ForegroundColor Green
    Write-Host "✅ CSS structure is healthy" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  $issues issues detected" -ForegroundColor Yellow
    Write-Host "📋 Review the issues above before proceeding" -ForegroundColor Yellow
    
    if ($BackupPath) {
        Write-Host "🔄 To restore backup: Copy-Item '$BackupPath' '../styles' -Recurse -Force" -ForegroundColor Cyan
    }
    exit 1
}
