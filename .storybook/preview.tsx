import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { handlers } from '../src/mocks/handlers';
import { queryClient } from '../src/apis/queryClient';
import '../src/index.css';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    msw: {
      handlers: {
        ...handlers,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1d1d1d',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],

  tags: ['autodocs'],
};

export default preview;
