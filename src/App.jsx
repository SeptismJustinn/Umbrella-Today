import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Forecast from "./pages/Forecast";
import Astronomy from "./pages/Astronomy";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/astronomy" element={<Astronomy />} />
      </Routes>
    </>
  );
}

export default App;
