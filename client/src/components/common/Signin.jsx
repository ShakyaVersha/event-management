import React, { useState } from 'react';
import apiService from '../../utils/apiService';
import { toast } from 'react-toastify';

const SignIn = ({ onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post('http://localhost:5000/api/users', formData);
      console.log(response);
      toast.success('User saved!');
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Internal server error")
      }
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit" className="submit-btn">Create Account</button>
          <button className="switch-btn" onClick={onLoginClick}>Already have an account? Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
