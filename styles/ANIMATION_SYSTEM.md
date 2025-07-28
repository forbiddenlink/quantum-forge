# Quantum Forge Animation System

This document outlines the core animation system used in the Quantum Forge project. All animations are designed to be performant, accessible, and customizable through CSS variables.

## Core Animations

### Basic Transitions
- `fadeIn`: Simple opacity transition
- `scaleIn`: Combined scale and fade effect
- `slideIn`: Customizable slide with fade

### Interactive Feedback
- `pulse`: Configurable scale pulse with opacity
- `shimmer`: Enhanced shimmer effect with gradient support
- `wave`: Natural waving motion

### Status Effects
- `rotate`: Simple rotation
- `breathe`: Customizable glow effect
- `float`: Smooth floating motion

### Text Effects
- `typing`: Typewriter effect
- `blink-caret`: Cursor blink animation

## Customization Variables

Use these CSS variables to customize animations:

```css
:root {
  /* Slide Animation */
  --slide-distance: 10px;
  
  /* Pulse Animation */
  --pulse-scale: 1.05;
  --pulse-opacity-start: 1;
  --pulse-opacity-mid: 0.8;
  
  /* Breathe Animation */
  --breathe-scale: 1.1;
  --glow-spread: 10px;
  --glow-color: rgba(16, 185, 129, 0.7);
  
  /* Float Animation */
  --float-distance: -10px;
}
```

## Accessibility

All animations respect the user's motion preferences through the `prefers-reduced-motion` media query. When reduced motion is enabled:
- All animations are disabled
- Transitions are removed
- Changes happen instantly

## Usage Examples

```css
/* Basic fade in */
.element {
  animation: fadeIn 0.3s ease-out;
}

/* Customized pulse */
.button {
  --pulse-scale: 1.1;
  --pulse-opacity-mid: 0.7;
  animation: pulse 1s infinite;
}

/* Accessible hover effect */
@media (prefers-reduced-motion: no-preference) {
  .card:hover {
    animation: float 2s ease-in-out infinite;
  }
}
```

## Best Practices

1. Always provide fallbacks for animations
2. Use appropriate timing functions
3. Keep animations subtle and purposeful
4. Test with reduced motion enabled
5. Ensure animations enhance UX, not distract from it

## Performance Tips

- Use `transform` and `opacity` for best performance
- Avoid animating layout properties
- Keep animations short and focused
- Use `will-change` sparingly
