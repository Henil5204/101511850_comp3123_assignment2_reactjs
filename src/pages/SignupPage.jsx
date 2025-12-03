// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/user/signup", form);
      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Signup</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              placeholder="johndoe"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
