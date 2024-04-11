import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types/errorBoundary.types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info.componentStack);
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="flex h-full items-center justify-center text-center text-2xl">
          Something went wrong: {this.state.errorMessage}
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
