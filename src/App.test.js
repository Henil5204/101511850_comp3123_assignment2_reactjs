import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/employeeList';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/employeeList" element={<EmployeeList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;