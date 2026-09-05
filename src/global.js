import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: background-color 0.45s ease, color 0.45s ease;
  }

  /* Almost every colour in this codebase is applied as an inline style from the
     active theme object, so swapping palettes would otherwise snap instantly.
     Transitioning the colour properties app-wide turns the switch into a wash.

     Scoped to colour properties only: a blanket \`transition: all\` would also
     catch layout and transform changes and make interactions feel laggy. Any
     component that declares its own \`transition\` (buttons, cards) overrides
     this for its own element, which is fine - those already animate. */
  .app-content *:not(canvas):not(svg):not(svg *) {
    transition: background-color 0.45s ease, color 0.45s ease,
      border-color 0.45s ease, fill 0.45s ease, stroke 0.45s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    body,
    .app-content *:not(canvas):not(svg):not(svg *) {
      transition: none;
    }
  }

  /* Keyboard focus was falling back to the UA default, which is invisible on
     several of the darker palettes. */
  .app-content a:focus-visible,
  .app-content button:focus-visible,
  .app-content input:focus-visible,
  .app-content textarea:focus-visible {
    outline: 2px solid ${({ theme }) => theme.imageHighlight};
    outline-offset: 3px;
    border-radius: 4px;
  }`;
