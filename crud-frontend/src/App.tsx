import React, { lazy, Suspense, FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoggedIn from "./pages/loggedIn/loggedIn";
import HomePage from "./pages/home/home"
import { AuthProvider } from "./contexts/AuthContext";

const AppRoutes: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logged-in" element={<LoggedIn />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
