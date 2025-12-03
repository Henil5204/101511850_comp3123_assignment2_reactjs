// src/pages/EmployeeDetailsPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/emp/employees/${id}`);
        setEmp(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee.");
      }
    };
    load();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!emp) return <p>Loading employee...</p>;

  return (
    <div>
      <h2 className="mb-3">Employee Details</h2>

      <div className="card mb-3">
        <div className="card-body d-flex">
          {emp.profilePicture && (
            <img
              src={emp.profilePicture}
              alt={emp.first_name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            />
          )}

          <div>
            <h4>
              {emp.first_name} {emp.last_name}
            </h4>
            <p className="mb-1"><strong>Email:</strong> {emp.email}</p>
            <p className="mb-1"><strong>Department:</strong> {emp.department}</p>
            <p className="mb-1"><strong>Position:</strong> {emp.position}</p>
            <p className="mb-1"><strong>Salary:</strong> {emp.salary}</p>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <Link to={`/employees/${emp._id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
