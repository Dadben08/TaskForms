import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use context function

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("All fields are required");

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://taskform-backend.onrender.com/api/auth/login",
        { email, password }
      );

      // ✅ use the context login function
      login(res.data.user, res.data.token);

      // ✅ navigate instantly
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
