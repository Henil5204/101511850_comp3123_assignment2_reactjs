// src/pages/EmployeeFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  department: "",
  position: "",
  salary: "",
};

const EmployeeFormPage = ({ mode }) => {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Load existing employee on edit
  useEffect(() => {
    const loadEmployee = async () => {
      if (!isEdit || !id) return;
      try {
        const res = await api.get(`/emp/employees/${id}`);
        const emp = res.data;
        setForm({
          first_name: emp.first_name || "",
          last_name: emp.last_name || "",
          email: emp.email || "",
          department: emp.department || "",
          position: emp.position || "",
          salary: emp.salary || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load employee.");
      }
    };
    loadEmployee();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (file) {
        formData.append("profilePicture", file);
      }

      if (isEdit) {
        await api.put(`/emp/employees/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/emp/employees`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save employee.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4 text-center">
          {isEdit ? "Update Employee" : "Add Employee"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                className="form-control"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                name="last_name"
                className="form-control"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input
                name="department"
                className="form-control"
                value={form.department}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Position</label>
              <input
                name="position"
                className="form-control"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Salary</label>
              <input
                name="salary"
                type="number"
                className="form-control"
                value={form.salary}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="form-text">
                Optional. Image will be uploaded to the backend.
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {isEdit ? "Save Changes" : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormPage;
