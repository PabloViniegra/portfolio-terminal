import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: () => {},
  writable: true,
});

Object.defineProperty(window, 'requestAnimationFrame', {
  value: (callback: FrameRequestCallback) => window.setTimeout(callback, 0),
  writable: true,
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  vi.restoreAllMocks();
  vi.useRealTimers();
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: (id: number) => window.clearTimeout(id),
  writable: true,
});

Object.defineProperty(window, 'matchMedia', {
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
  writable: true,
});
