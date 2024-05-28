import React from 'react';
import ErrorDisplay from '@/errors/error-ui/ErrorUI';
import { errorConfig } from '../ErrorConfig';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types/errorBoundary.types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorType: '', errorMessage: '' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack);

    let errorType = '';
    if (error.message.includes('Product type')) {
      errorType = 'UnsupportedProduct';
    } else if (error.message.includes('Sub product type')) {
      errorType = 'UnsupportedSubProduct';
    }

    this.setState({ hasError: true, errorType, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      const { errorType, errorMessage } = this.state;
      const config = errorConfig[errorType] || {
        title: 'An Error Occurred',
        description: 'An unexpected error occurred. Please try again later.',
      };

      return <ErrorDisplay title={config.title} description={config.description} message={errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
