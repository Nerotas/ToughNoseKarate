import { Metadata } from 'next';
import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import './global.css';

export const metadata: Metadata = {
  title: 'Tough Nose Karate',
  description: 'Tang Soo Do martial arts training and belt requirements',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon.png',
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
