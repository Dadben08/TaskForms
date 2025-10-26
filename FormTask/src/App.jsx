import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext"; // ✅ import hook

const App = () => {
  const { token } = useAuth(); // ✅ get token from context

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
