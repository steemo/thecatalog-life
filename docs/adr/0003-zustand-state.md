# ADR-0003: Zustand for State Management

**Status:** Accepted  
**Date:** 22 February 2026  
**Deciders:** Tiko Abousteit

---

## Context

The application needs to manage:
- Language preference (Arabic/English)
- Theme preference (Light/Dark)
- Potentially: search filters, UI state

State requirements are minimal but need to persist across page navigation.

## Decision Drivers

* **Must persist** language and theme preferences
* **Should be lightweight** (small app, minimal state)
* **Should avoid unnecessary re-renders**
* **Should be simple** to implement and maintain

## Considered Options

### Option 1: React Context API
- **Pros:**
  - Built into React, no dependencies
  - Simple for small state
  - Familiar pattern
- **Cons:**
  - Re-renders all consumers on any state change
  - Boilerplate for multiple contexts
  - No built-in persistence

### Option 2: Zustand
- **Pros:**
  - Minimal boilerplate (~10 lines for store)
  - Selective subscriptions (no unnecessary re-renders)
  - Built-in persistence middleware
  - TypeScript-first
  - Tiny bundle (~1KB)
- **Cons:**
  - External dependency
  - Another API to learn

### Option 3: Redux Toolkit
- **Pros:**
  - Industry standard
  - Excellent DevTools
  - Predictable state updates
- **Cons:**
  - Overkill for this scope
  - More boilerplate
  - Larger bundle

### Option 4: Jotai
- **Pros:**
  - Atomic state model
  - Minimal boilerplate
  - Good for derived state
- **Cons:**
  - Different mental model
  - Less intuitive for simple use cases

## Decision

We will use **Zustand** for state management.

## Rationale

1. **Right-sized** - Not overkill like Redux, more capable than Context
2. **Performance** - Selective subscriptions prevent unnecessary re-renders
3. **Persistence** - Built-in middleware for localStorage
4. **Simplicity** - Single store, minimal API

## Consequences

### Positive
- Language/theme state persists across sessions
- Components only re-render when their subscribed state changes
- Clean, minimal store definition
- Easy to extend if state grows

### Negative
- External dependency (though tiny)
- Team needs to learn Zustand patterns

## Implementation Notes

```typescript
// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  setLanguage: (lang: 'ar' | 'en') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ar',
      theme: 'light',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    { name: 'quranic-app-settings' }
  )
);
```

---

**End of ADR**
