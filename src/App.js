// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected employee routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/employees" element={<EmployeeListPage />} />
            <Route path="/employees/new" element={<EmployeeFormPage mode="create" />} />
            <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
            <Route path="/employees/:id/edit" element={<EmployeeFormPage mode="edit" />} />
          </Route>

          <Route path="*" element={<h3>404 - Not Found</h3>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
