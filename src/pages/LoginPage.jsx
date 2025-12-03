// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [loginValue, setLoginValue] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginValue || !password) {
      setError("Please enter username/email and password.");
      return;
    }

    try {
      const payload = loginValue.includes("@")
        ? { email: loginValue, password }
        : { username: loginValue, password };

      const res = await api.post("/user/login", payload);
      const token = res.data.token;

      login(token);
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2 className="mb-4 text-center">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder="Enter username or email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
