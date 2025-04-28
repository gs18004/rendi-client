import { queryClient } from '../apis/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../index.css';

type WrapperProps = {
  children: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
const renderWithContext = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithContext as render };
