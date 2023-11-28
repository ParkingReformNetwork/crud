import React, { lazy, Suspense, FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home/home"));

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
