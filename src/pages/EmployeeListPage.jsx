// src/pages/EmployeeListPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

const fetchEmployees = async ({ queryKey }) => {
  const [ filters] = queryKey;
  const params = {};

  if (filters.department) params.department = filters.department;
  if (filters.position) params.position = filters.position;

  const res = await api.get("/emp/employees", { params });
  return res.data;
};

const EmployeeListPage = () => {
  const [filters, setFilters] = useState({ department: "", position: "" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees", filters],
    queryFn: fetchEmployees,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete("/emp/employees", { params: { eid: id } });
      queryClient.invalidateQueries(["employees"]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete employee.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee List</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/employees/new")}
        >
          + Add Employee
        </button>
      </div>

      {/* Search / Filter */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Search Employees</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                placeholder="Filter by department"
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                name="position"
                value={filters.position}
                onChange={handleFilterChange}
                placeholder="Filter by position"
              />
            </div>
          </div>
          <small className="text-muted">
            Filters apply automatically using TanStack Query.
          </small>
        </div>
      </div>

      {isLoading && <p>Loading employees...</p>}
      {isError && <p className="text-danger">Failed to load employees.</p>}

      {!isLoading && employees.length === 0 && (
        <p>No employees found. Try adjusting your filters or add a new one.</p>
      )}

      {employees.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Profile Picture</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.first_name} {emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>{emp.salary}</td>
                  <td>
                    {emp.profilePicture && (
                      <img
                        src={emp.profilePicture}
                        alt={emp.first_name}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                      />
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link
                        to={`/employees/${emp._id}`}
                        className="btn btn-outline-secondary"
                      >
                        View
                      </Link>
                      <Link
                        to={`/employees/${emp._id}/edit`}
                        className="btn btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeListPage;
