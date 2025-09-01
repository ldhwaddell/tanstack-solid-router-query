// src/router.tsx
import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import { setupRouterSsrQueryIntegration } from "./test-ssr-query-integration";
import { QueryClient } from "@tanstack/solid-query";

export function createRouter() {
  // const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  });

  // setupRouterSsrQueryIntegration({
  //   router,
  //   queryClient,
  //   handleRedirects: true,
  //   wrapQueryClient: true,
  // });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
