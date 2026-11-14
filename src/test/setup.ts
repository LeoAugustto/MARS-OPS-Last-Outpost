import "@testing-library/jest-dom/vitest";

// Node 25+ tem um localStorage/sessionStorage próprio (experimental) que esconde o do jsdom
// e fica undefined sem --localstorage-file. Usa o do jsdom para os testes funcionarem em qualquer Node.
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
for (const key of ["localStorage", "sessionStorage"] as const) {
  const fromJsdom = jsdomWindow?.[key];
  if (fromJsdom && globalThis[key] !== fromJsdom) {
    Object.defineProperty(globalThis, key, {
      value: fromJsdom,
      configurable: true,
      writable: true,
    });
  }
}

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
