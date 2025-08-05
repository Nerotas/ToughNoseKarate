'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { IconRefresh } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * A smaller, more focused error boundary for wrapping specific components or sections.
 * Use this for granular error handling where you want to isolate errors to specific parts
 * of the UI without crashing the entire page.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SectionErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default compact error UI
      return (
        <Alert
          severity='error'
          sx={{ my: 2 }}
          action={
            <Button size='small' startIcon={<IconRefresh />} onClick={this.handleRetry}>
              Retry
            </Button>
          }
        >
          <Typography variant='body2'>
            Something went wrong in this section.
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                component='span'
                sx={{ display: 'block', mt: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}
              >
                {this.state.error.message}
              </Box>
            )}
          </Typography>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
