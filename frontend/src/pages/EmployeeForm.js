import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    hireDate: ''
  });
  const [error, setError] = useState('');
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      const employee = response.data;
      setFormData({
        ...employee,
        hireDate: new Date(employee.hireDate).toISOString().split('T')[0]
      });
    } catch (error) {
      setError('Error fetching employee details');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/employees/${id}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/employees', formData, config);
      }
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving employee');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">{id ? 'Edit Employee' : 'Add Employee'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hire Date</label>
          <input
            type="date"
            className="form-control"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Add'} Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
