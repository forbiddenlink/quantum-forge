# CSS Cleanup Tools Directory

## 📁 **File Organization**

### **📋 Main Documentation**
- **`CSS_CLEANUP_MASTER_GUIDE.md`** - Complete guide with current state, targets, and methodology
- **`css-cleanup-plan.md`** - High-level project plan and progress tracking  
- **`TOOLS_REFERENCE.md`** - Safe tools and scripts reference

### **🔧 Working Scripts**
- **`find-duplicates.js`** - ✅ Reliable duplicate detection and reporting
- **`main-css-dead-code-cleanup.ps1`** - ✅ Safe migration comment removal

### **📊 Current Analysis**
- **`css-duplication-report.md`** - Latest duplicate analysis (478 duplicates)

### **⚠️ Deprecated/Broken Scripts**
- `consolidate-animations.ps1` - ❌ DO NOT USE (breaks CSS structure)
- `advanced-welcome-cleanup.ps1` - ❌ DO NOT USE (too aggressive)
- Other experimental scripts - Use with extreme caution

## 🚀 **Quick Start**

### **Check Current Status**
```powershell
# Run duplicate analysis
node find-duplicates.js

# Check file sizes
Get-ChildItem "..\styles\*.css" | Sort-Object Length -Desc | Select-Object -First 5 Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,1)}}
```

### **Before Making Changes**
1. **Read**: `CSS_CLEANUP_MASTER_GUIDE.md` for methodology
2. **Backup**: Create timestamped backup of target files
3. **Focus**: Work on ONE component type at a time

**Current Status: 478 duplicates, ready for systematic cleanup using proven methodology.**
