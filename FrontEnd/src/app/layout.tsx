import { Metadata } from 'next';
import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import './global.css';
import ConfigValidator from './config-validator';

export const metadata: Metadata = {
  title: 'Tough Nose Karate',
  description: 'Tang Soo Do martial arts training and belt requirements',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/icon-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        <ConfigValidator>
          <Providers>
            <ClientThemeProvider>{children}</ClientThemeProvider>
          </Providers>
        </ConfigValidator>
      </body>
    </html>
  );
}
