import type { RouteObject } from "react-router-dom";

import { lazy } from "react";

const IndexPage = lazy(() => import("./pages"));
const FinancingRequestPage = lazy(() => import("./pages/financing-request"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/financing-request",
    element: <FinancingRequestPage />,
  },
];
