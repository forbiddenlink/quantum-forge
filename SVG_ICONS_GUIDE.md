# SVG Icons Quick Reference Guide

## How to Use SVG Icons in Quantum Forge

### Import the Icon Library
```javascript
import { SVGIcons, getIconHTML } from './js/utils/svg-icons.js';
```

### Method 1: Direct Icon Usage
```javascript
// Get an icon with default styling
const dashboardIcon = SVGIcons.dashboard;

// Get an icon with custom styling
const customIcon = SVGIcons.getIcon('star', {
    width: '20px',
    height: '20px',
    color: '#ff6b35'
});
```

### Method 2: Quick HTML Insertion
```javascript
// Simple usage with default size (16px)
const heartIcon = getIconHTML('healthCoverage');

// Custom size
const bigStar = getIconHTML('star', '32px');

// With custom styles
const coloredIcon = getIconHTML('trophy', '24px', {
    color: 'gold',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
});
```

### Method 3: In Component Templates
```javascript
// In a component's render method
render() {
    return `
        <div class="card">
            <div class="card-icon">
                ${getIconHTML('analytics', '20px')}
            </div>
            <h3>Analytics Dashboard</h3>
        </div>
    `;
}
```

## Available Icons

### Navigation
- `dashboard` - Home/dashboard icon
- `profile` - User profile icon
- `team` - Team/group icon
- `tasks` - Task/checklist icon

### Stats & Metrics
- `healthCoverage` - Health/medical icon
- `money` - Dollar/financial icon
- `vacation` - Time off/vacation icon
- `learning` - Book/education icon

### Analytics & Trends
- `trendingUp` - Upward trend chart
- `analytics` - Line chart/data icon
- `clock` - Time/duration icon

### Actions
- `star` - Star/favorite icon
- `trophy` - Achievement/award icon
- `checkCircle` - Success/completion icon
- `plus` - Add/create icon
- `minus` - Remove/subtract icon
- `edit` - Edit/modify icon
- `delete` - Delete/trash icon
- `close` - Close/X icon

### Categories
- `development` - Code/programming icon
- `design` - Design/creative icon
- `product` - Product/package icon
- `security` - Shield/security icon

### UI Elements
- `search` - Search/magnifying glass
- `settings` - Settings/configuration

## Styling Tips

### CSS Customization
```css
/* Target all SVG icons */
.icon svg {
    transition: all 0.3s ease;
}

/* Hover effects */
.icon:hover svg {
    transform: scale(1.1);
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
}

/* Color theming */
.icon.primary svg {
    stroke: var(--primary-color);
}

.icon.success svg {
    stroke: var(--success-color);
}
```

### JavaScript Styling
```javascript
// Add hover effects programmatically
const icon = document.querySelector('.my-icon svg');
icon.style.transition = 'transform 0.3s ease';
icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.1)';
});
icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1)';
});
```

## Best Practices

1. **Consistent Sizing**: Use standard sizes (16px, 20px, 24px, 32px)
2. **Accessibility**: Always include proper ARIA labels
3. **Performance**: Reuse the same icon instances when possible
4. **Theming**: Use CSS custom properties for colors
5. **Animation**: Add subtle transitions for better UX

### Accessibility Example
```html
<button type="button" aria-label="Close dialog">
    ${getIconHTML('close', '16px')}
</button>
```

### Theme Integration Example
```css
:root {
    --icon-color: #374151;
    --icon-hover-color: #111827;
}

[data-theme="dark"] {
    --icon-color: #e5e7eb;
    --icon-hover-color: #ffffff;
}

.icon svg {
    stroke: var(--icon-color);
}

.icon:hover svg {
    stroke: var(--icon-hover-color);
}
```

## Migration from Old Icons

If you find any remaining emoji or text icons:

1. Identify the icon type and purpose
2. Choose appropriate SVG from the library
3. Replace using one of the methods above
4. Test for visual consistency
5. Update any related CSS styling

## Adding New Icons

To add a new icon to the library:

1. Find a suitable SVG from a source like [Lucide Icons](https://lucide.dev/)
2. Add it to the `SVGIcons` object in `js/utils/svg-icons.js`
3. Follow the existing naming convention
4. Update this documentation

Example:
```javascript
newIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="your-svg-path-here"></path>
</svg>`,
```
