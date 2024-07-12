// src/queryClient.js
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
