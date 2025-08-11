'use client';

import { useEffect, useState } from 'react';
import { validateRuntimeConfig, shouldEnableDebug } from '../utils/config/frontend.config';
import Loading from 'app/loading';

interface ConfigValidatorProps {
  children: React.ReactNode;
}

export default function ConfigValidator({ children }: ConfigValidatorProps) {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      validateRuntimeConfig();
      setIsValid(true);

      if (shouldEnableDebug()) {
        console.log('🔧 Configuration validation completed successfully');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Configuration validation failed';
      setError(errorMessage);
      setIsValid(false);

      // Log error for debugging
      console.error('❌ Configuration validation failed:', err);
    }
  }, []);

  if (!isValid && error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '600px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <h1
            style={{
              color: '#d32f2f',
              marginBottom: '1rem',
              fontSize: '1.5rem',
            }}
          >
            ⚠️ Configuration Error
          </h1>

          <p
            style={{
              color: '#666',
              marginBottom: '1.5rem',
              lineHeight: '1.6',
            }}
          >
            The application configuration is invalid. Please check your environment variables.
          </p>

          <div
            style={{
              backgroundColor: '#ffebee',
              border: '1px solid #ffcdd2',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}
          >
            <strong>Error Details:</strong>
            <br />
            <code
              style={{
                fontSize: '0.9rem',
                color: '#d32f2f',
                wordBreak: 'break-word',
              }}
            >
              {error}
            </code>
          </div>

          <details style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Common Solutions
            </summary>
            <ul style={{ paddingLeft: '1.5rem', color: '#666' }}>
              <li>
                Check if <code>.env.local</code> file exists in the project root
              </li>
              <li>
                Verify that <code>NEXT_PUBLIC_API_PATH</code> is set to a valid URL
              </li>
              <li>Ensure all required environment variables are configured</li>
              <li>
                Copy from <code>.env.example</code> if available
              </li>
              <li>Restart the development server after making changes</li>
            </ul>
          </details>

          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isValid) {
    // Loading state while validating
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#666',
          }}
        >
          <Loading />
          <p>Rolling out mats...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
