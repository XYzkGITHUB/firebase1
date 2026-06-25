
'use client';

import { useEffect } from 'react';

export function FaviconSetter() {
  useEffect(() => {
    // 1. Create a data URI for the SVG favicon
    const faviconUrl = `data:image/svg+xml,
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="%232563EB"/>
        <text x="50%" y="55%" 
              font-family="Arial, sans-serif" 
              font-weight="bold" 
              font-size="60" 
              fill="white" 
              dominant-baseline="middle" 
              text-anchor="middle">R</text>
      </svg>`;

    // 2. Find the existing favicon link element or create one
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // 3. Set the SVG string as the icon source, cleaning up whitespaces
    link.href = faviconUrl.replace(/\s+/g, ' ');
  }, []);

  return null;
}
