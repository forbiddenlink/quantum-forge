# ⚠️ Deprecated/Unsafe Scripts

## **DO NOT USE THESE SCRIPTS**

These scripts have been moved here because they were found to be unsafe or cause CSS structure problems:

### **❌ Broken Scripts**
- `consolidate-animations.ps1` - Breaks @keyframes structure by removing keyframe declarations
- `advanced-welcome-cleanup.ps1` - Too aggressive on variables, can break styling
- `enhanced-keyframe-cleanup.ps1` - Untested automation that may cause errors
- `fix-broken-keyframes.ps1` - May introduce CSS parsing errors

### **❌ Experimental/Untested**
- `backup-css.js` - Untested backup script
- `remove-duplicates.js` - Mass removal without proper validation
- `consolidate-welcome-variables.ps1` - Too aggressive variable consolidation

## **Why These Failed**

1. **CSS Structure Ignorance**: Mass regex replacement without understanding CSS syntax
2. **No Validation**: Changes made without checking if resulting CSS is valid
3. **Too Aggressive**: Automated changes that should require manual inspection
4. **Keyframe Problems**: Removing keyframe declarations while leaving orphaned content

## **Use Instead**

- **For duplicates**: `find-duplicates.js` (in parent directory)
- **For dead code**: `main-css-dead-code-cleanup.ps1` (tested safe)
- **For consolidation**: Manual inspection + targeted scripts
- **For backups**: PowerShell `Copy-Item` with timestamps

**The proven safe methodology is documented in `../CSS_CLEANUP_MASTER_GUIDE.md`**
