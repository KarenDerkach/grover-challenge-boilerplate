import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* Reset CSS básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* HTML y Body */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: #343a40;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Enlaces */
  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #4CAF50;
    }
  }

  /* Botones */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Inputs */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  /* Listas */
  ul, ol {
    list-style: none;
  }

  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Encabezados */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 16px;
    color: #212529;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 16px;
  }

  /* Párrafos */
  p {
    margin-bottom: 16px;
  }

  /* Código */
  code {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 14px;
    background-color: #f8f9fa;
    padding: 4px 8px;
    border-radius: 2px;
  }

  /* Scrollbar personalizada (webkit) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f8f9fa;
  }

  ::-webkit-scrollbar-thumb {
    background: #ced4da;
    border-radius: 9999px;

    &:hover {
      background: #adb5bd;
    }
  }

  /* Utilidades de accesibilidad */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Foco para accesibilidad */
  :focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  /* Responsive breakpoints helpers */
  @media (max-width: 640px) {
    body {
      font-size: 14px;
    }
  }
`

export default GlobalStyles