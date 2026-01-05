import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_up from "./Components/Sign_up/Sign_up";
import Login from "./Components/Login/Login";
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Routing;
