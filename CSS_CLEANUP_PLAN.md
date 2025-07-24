# CSS Cleanup Plan

## Current Issues Identified

### 1. Duplicate Sidebar Definitions
- **main.css**: 3 duplicate `.sidebar` definitions (lines 420, 1397, 8536)
- **sidebar.css**: Dedicated sidebar file with comprehensive styles
- **enhanced-colors.css**: Additional sidebar styles
- **mobile-optimizations.css**: Responsive sidebar styles

### 2. Duplicate Header Definitions
- **main.css**: Multiple `.header` definitions
- **header.css**: Dedicated header file
- **enhanced.css**: Additional header styles
- **critical.css**: Critical header styles
- **mobile-optimizations.css**: Responsive header styles

### 3. Duplicate Main Container Definitions
- **main.css**: Multiple `.main-container` definitions
- **sidebar.css**: Main container styles
- **enhanced.css**: Additional container styles
- **mobile-optimizations.css**: Responsive container styles

### 4. Layout Conflicts
- Sidebar collapse functionality conflicts
- Main content margin adjustments
- Responsive breakpoint conflicts

## Cleanup Strategy

### Phase 1: Consolidate Core Layout Styles
1. **Keep sidebar.css as the single source of truth** for sidebar styles
2. **Remove duplicate sidebar definitions** from main.css
3. **Keep header.css as the single source of truth** for header styles
4. **Remove duplicate header definitions** from main.css
5. **Consolidate main-container styles** in main.css only

### Phase 2: Remove Duplicates from main.css
1. Remove duplicate sidebar definitions (lines 420-519, 8536-8629)
2. Remove duplicate header definitions (lines 344-370, 8461-8486)
3. Remove duplicate main-container definitions (lines 312, 1283, 8435)
4. Keep only the first instance of each

### Phase 3: Ensure Layout Integrity
1. **Preserve sidebar collapse functionality** - this is critical
2. **Maintain main content margin adjustments** when sidebar is collapsed
3. **Keep responsive breakpoints** working correctly
4. **Preserve all interactive elements** and hover states

### Phase 4: Test and Verify
1. Test sidebar collapse/expand functionality
2. Verify main content doesn't shift unexpectedly
3. Test responsive behavior on mobile
4. Verify all interactive elements work correctly

## Files to Modify

### Primary Changes
- **styles/main.css**: Remove duplicates, keep core layout
- **styles/sidebar.css**: Keep as is (comprehensive sidebar styles)
- **styles/header.css**: Keep as is (dedicated header styles)

### Files to Leave Unchanged
- **styles/critical.css**: Critical rendering path
- **styles/mobile-optimizations.css**: Responsive overrides
- **styles/enhanced.css**: Component-specific enhancements

## Critical Considerations

### Sidebar Functionality
- The sidebar has complex collapse/expand functionality
- Main content must adjust margin when sidebar is collapsed
- All interactive elements must remain functional

### Layout Structure
```
.dashboard
├── .header (sticky)
└── .main-container
    ├── .sidebar (collapsible)
    └── .main-content (adjusts margin)
```

### Responsive Behavior
- Sidebar becomes overlay on mobile
- Main content takes full width when sidebar is hidden
- Touch-friendly interactions on mobile

## Implementation Order

1. **Backup current state**
2. **Remove duplicate sidebar definitions** from main.css
3. **Remove duplicate header definitions** from main.css
4. **Remove duplicate main-container definitions** from main.css
5. **Test sidebar functionality**
6. **Test responsive behavior**
7. **Verify no layout shifts**

## Success Criteria

- ✅ No duplicate CSS rules
- ✅ Sidebar collapse/expand works correctly
- ✅ Main content adjusts properly when sidebar is collapsed
- ✅ Responsive behavior works on all screen sizes
- ✅ No layout shifts or unexpected behavior
- ✅ All interactive elements remain functional 