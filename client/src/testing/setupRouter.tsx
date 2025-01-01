import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export const RouterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/workout" element={<div>Workout</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/statistics" element={<div>Statistics</div>} />
      </Routes>
    </MemoryRouter>
  );
};
