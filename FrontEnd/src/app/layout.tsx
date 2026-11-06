import Script from 'next/script';
import Providers from './providers';
import ClientThemeProvider from './theme-provider';
import ErrorBoundary from '../components/ErrorBoundary';
import './global.css';
import ConfigValidator from './config-validator';
import { getConfig } from '../utils/config/frontend.config';
import BackgroundRefreshIndicator from '../components/loading/BackgroundRefreshIndicator';

export { metadata } from './(DashboardLayout)/metadata';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  getConfig();

  return (
    <html lang='en'>
      <body>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-2HLMNVXJJ1'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2HLMNVXJJ1');
          `}
        </Script>
        <ConfigValidator>
          <ErrorBoundary>
            <Providers>
              <ClientThemeProvider>
                {children}
                <BackgroundRefreshIndicator />
              </ClientThemeProvider>
            </Providers>
          </ErrorBoundary>
        </ConfigValidator>
      </body>
    </html>
  );
}
