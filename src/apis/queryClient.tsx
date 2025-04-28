import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_error, query) => {
      if (!query.state.data) {
        query.reset();
      }
    },
  }),
  defaultOptions: {
    mutations: {
      throwOnError: true,
    },
    queries: {
      throwOnError: true,
      retry: 3,
    },
  },
});
