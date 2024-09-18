import React, { lazy, Suspense } from "react";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
// Lazy-load the Details component
// const Details = lazy(() => import("./pages/Details"));
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
