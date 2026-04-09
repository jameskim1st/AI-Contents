/// <reference types="astro/client" />

// Vite raw imports (e.g., import content from './file.html?raw')
declare module '*.html?raw' {
  const content: string;
  export default content;
}
