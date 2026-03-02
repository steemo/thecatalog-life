# ADR-0002: Tailwind CSS for Styling

**Status:** Accepted  
**Date:** 22 February 2026  
**Deciders:** Tiko Abousteit

---

## Context

We need a styling solution for the Quranic app that supports:
- Custom Islamic design system (specific colours, typography)
- RTL (right-to-left) layout for Arabic content
- Responsive design (mobile-first)
- Dark mode support
- Consistent design tokens

## Decision Drivers

* **Must support RTL** for Arabic content
* **Must allow custom design** (Islamic colour palette)
* **Should have small bundle size** for performance
* **Should be maintainable** with clear patterns

## Considered Options

### Option 1: Tailwind CSS v4
- **Pros:**
  - Utility-first, highly customisable
  - Built-in RTL support (`rtl:` variant)
  - Small bundle (purges unused CSS)
  - Design tokens via CSS variables
  - Dark mode built-in (`dark:` variant)
- **Cons:**
  - Verbose class names in JSX
  - Learning curve for utility patterns
  - No pre-built components

### Option 2: MUI (Material-UI) v7
- **Pros:**
  - Pre-built accessible components
  - Faster initial development
  - Built-in theming system
- **Cons:**
  - Larger bundle size (~300KB)
  - Material Design aesthetic (not Islamic)
  - Customisation requires theme overrides
  - RTL requires additional configuration

### Option 3: CSS Modules + Custom CSS
- **Pros:**
  - Full control
  - No dependencies
  - Scoped styles
- **Cons:**
  - More CSS to write
  - No design system enforcement
  - Harder to maintain consistency

## Decision

We will use **Tailwind CSS v4** for styling.

## Rationale

1. **Custom design is essential** - Islamic aesthetic requires specific colours, typography
2. **RTL is first-class** - `rtl:` variant makes bidirectional layouts simple
3. **Performance** - Purged CSS results in tiny bundle
4. **Design tokens** - CSS variables in v4 enable consistent theming

## Consequences

### Positive
- Complete design control for Islamic aesthetic
- Excellent RTL support
- Small production bundle
- Dark mode with minimal effort

### Negative
- Must build all components from scratch
- Verbose class names in components
- No pre-built accessible components

### Mitigations
- Create reusable component library early
- Use `clsx` or `tailwind-merge` for class management
- Follow accessibility guidelines manually

## Implementation Notes

```javascript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1F4788',
          600: '#163560',
        },
        secondary: {
          500: '#D4AF37',
          600: '#B8960F',
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

**End of ADR**
