/**
 * queryClient.js
 *
 * Purpose:
 * - Configures the react-query client for managing server state.
 *
 * Example:
 * - Sets default options for queries, such as staleTime and cacheTime.
 */

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1, // 1 millisecond, so the data is always considered stale
      cacheTime: 0, // 0 milliseconds, so the cache is cleared immediately
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
