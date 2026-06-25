import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { FaviconSetter } from "@/components/ui/favicon-setter";

export const metadata: Metadata = {
  title: 'RION',
  description: 'Международные поставки строительных материалов под ключ. Керамогранит, ламинат, сантехника.',
  icons: {
    icon: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="white"/><text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="bold" font-size="60" fill="%238B5E3C" dominant-baseline="middle" text-anchor="middle">R</text></svg>`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              // Only add dark if explicitly saved as dark. Otherwise default to light (no class).
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `
        }} />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <FaviconSetter />
        <FirebaseClientProvider>
          {children}
          <div className="fixed bottom-8 left-8 z-[100]">
            <ToggleTheme />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
