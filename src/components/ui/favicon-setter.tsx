
'use client';

import { useEffect } from 'react';

export function FaviconSetter() {
  useEffect(() => {
    // 1. Create a data URI for the SVG favicon with correct namespace
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

    // 2. Find and update existing icon links, or create a new one
    const updateIcon = () => {
      const existingIcons = document.querySelectorAll("link[rel*='icon']");
      if (existingIcons.length > 0) {
        existingIcons.forEach((link: any) => {
          link.href = faviconUrl.replace(/\s+/g, ' ');
        });
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl.replace(/\s+/g, ' ');
        document.head.appendChild(link);
      }
    };

    updateIcon();
  }, []);

  return null;
}
