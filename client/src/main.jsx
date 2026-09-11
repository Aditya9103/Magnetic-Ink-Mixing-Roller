import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes fresh
      gcTime: 1000 * 60 * 60 * 24, // 24 hours persistent retention
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Instant 0ms cache reuse on page navigation
      retry: 2,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: "TANSTACK_QUERY_CACHE_V1",
});

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);
