# Component CSS Files

This directory contains modular CSS files for individual components. These files help reduce duplication and improve maintainability by isolating component-specific styles.

## Integration

To use these component styles:

1. Add the component CSS file to your HTML's head section after the main CSS files but before any page-specific CSS:

```html
<!-- Base styles -->
<link rel="stylesheet" href="styles/critical.css" />
<link rel="stylesheet" href="styles/main.css" />

<!-- Component styles -->
<link rel="stylesheet" href="styles/components/quick-insights.css" />
<!-- Add other component styles here -->

<!-- Page-specific styles -->
<link rel="stylesheet" href="styles/welcome-section.css" />
```

2. Remove any duplicate styles from the original CSS files and add a comment indicating where the styles were moved to.

## Current Components

- `quick-insights.css` - Styles for the Quick Insights component, extracted from welcome-section.css
  - Includes all text color overrides
  - Contains layout and component styles
  - Handles responsive design
  - Manages hover states and animations

## Best Practices

1. Keep component styles isolated and avoid dependencies on other components
2. Use CSS variables from critical.css for theming
3. Follow the existing naming conventions
4. Document any complex selectors or overrides
5. Include responsive styles within the component file
