import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
