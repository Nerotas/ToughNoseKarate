import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import './global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
