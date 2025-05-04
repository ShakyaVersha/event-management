import React, { useState } from 'react';
import apiService from '../../utils/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onSignInClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await apiService.post('http://localhost:5000/api/authentication/login', formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("id", res.data.user._id);
      localStorage.setItem("role", res.data.user.role);

      toast.success('Login successful!');
      onClose();
      if (onLoginSuccess) onLoginSuccess(); 

      if (res.data.user.role === "user") {
        navigate('/user-event');
      } else {
        navigate('/event');
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="modal-form">
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
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="switch-text">Don't have an account?</p>
        <button className="switch-btn" onClick={onSignInClick}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
