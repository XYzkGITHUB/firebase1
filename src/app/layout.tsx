
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ToggleTheme } from "@/components/ui/toggle-theme";

export const metadata: Metadata = {
  title: 'IRGG Luxe Surface | Керамогранит и Сантехника',
  description: 'Международные поставки строительных материалов под ключ. Керамогранит, ламинат, сантехника.',
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
