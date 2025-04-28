import Error from '~/pages/Error/Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@suspensive/react';

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  fullScreen?: boolean;
};
const ErrorBoundaryWrapper = ({
  children,
  fullScreen,
}: ErrorBoundaryWrapperProps) => {
  const location = useLocation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          key={location.pathname}
          fallback={({ error, reset }) => (
            <Error
              error={error}
              resetErrorBoundary={reset}
              fullScreen={fullScreen}
            />
          )}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundaryWrapper;
