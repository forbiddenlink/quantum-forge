# 🧹 CSS Cleanup Tools - Working Scripts

## 🟢 **SAFE & TESTED TOOLS**

### **Duplicate Analysis**
```powershell
# Find all duplicates and generate report
node find-duplicates.js

# View current duplicate count
Get-Content "css-duplication-report.md" | Select-String "Found \d+ duplicate" 
```

### **Backup Management**
```powershell
# Create backup before changes
$timestamp = Get-Date -Format 'yyyy-MM-dd-HH-mm'
Copy-Item "..\styles\filename.css" "..\styles\filename.css.backup-$timestamp"

# List available backups
Get-ChildItem "..\styles\*.backup*" | Sort-Object LastWriteTime -Descending

# Restore from backup
Copy-Item "..\styles\filename.css.backup-TIMESTAMP" "..\styles\filename.css" -Force
```

### **File Size Monitoring**
```powershell
# Check CSS file sizes
Get-ChildItem "..\styles\*.css" | Where-Object {$_.Length -gt 50KB} | 
  Select-Object Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,1)}} | 
  Sort-Object KB -Descending
```

## 🔧 **WORKING SCRIPTS**

### **Dead Code Cleanup (TESTED)**
- `main-css-dead-code-cleanup.ps1` - Removes migration comments safely

### **Duplicate Detection (RELIABLE)**
- `find-duplicates.js` - Comprehensive duplicate analysis
- Generates: `css-duplication-report.md`

## ⚠️ **DEPRECATED TOOLS (DO NOT USE)**

### **Broken/Dangerous Scripts**
- `consolidate-animations.ps1` - ❌ Breaks @keyframes structure  
- `advanced-welcome-cleanup.ps1` - ❌ Too aggressive on variables
- `enhanced-keyframe-cleanup.ps1` - ❌ Untested automation
- `fix-broken-keyframes.ps1` - ❌ May cause CSS errors

### **Why These Failed**
- Mass regex replacement without CSS structure validation
- Automated keyframe consolidation removes declarations incorrectly
- Variable consolidation without testing breaks styling

## 📊 **Quick Status Check**
```powershell
# Get current project status
Write-Host "=== CSS CLEANUP STATUS ===" -ForegroundColor Green
Write-Host "Duplicate Count: " -NoNewline; node find-duplicates.js 2>$null | Select-String "Found \d+" 
Write-Host "Main.css Size: " -NoNewline; [math]::Round((Get-Item "..\styles\main.css").Length/1KB,1); Write-Host "KB"
Write-Host "Welcome.css Size: " -NoNewline; [math]::Round((Get-Item "..\styles\welcome-section.css").Length/1KB,1); Write-Host "KB"
```

**Use only the SAFE & TESTED tools above. The methodology in CSS_CLEANUP_MASTER_GUIDE.md is proven and reliable.**
