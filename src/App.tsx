import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import { routes } from "./routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} element={route.element} path={route.path} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
