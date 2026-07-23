import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia. Framer Motion's useReducedMotion()
// (used by Hero, Task 14) calls it on every render, so without this stub
// every test that renders Hero throws "matchMedia is not a function".
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
