import React, { useContext } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { publicRoutes } from "../routes/routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
    <div className="app_container">
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
    </div>
    </BrowserRouter>
  );
};
