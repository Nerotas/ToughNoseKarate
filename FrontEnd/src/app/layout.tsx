import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import ErrorBoundary from '../components/ErrorBoundary';
import './global.css';
import ConfigValidator from './config-validator';
import { getConfig } from '../utils/config/frontend.config';

export { metadata } from './(DashboardLayout)/metadata';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  getConfig();

  return (
    <html lang='en'>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        <ConfigValidator>
          <ErrorBoundary>
            <Providers>
              <ClientThemeProvider>{children}</ClientThemeProvider>
            </Providers>
          </ErrorBoundary>
        </ConfigValidator>
      </body>
    </html>
  );
}
