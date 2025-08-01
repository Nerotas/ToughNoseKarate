import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tough Nose Karate',
  description: 'Karate training and belt requirements management system',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        <Providers>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
