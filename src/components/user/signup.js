// src/components/Signup.js
import axios from 'axios';
import React, { useState } from 'react';
import './signup.css'; // Import CSS for the signup component

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    first_name: '',
    last_name: '',
    contact_info: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact_info"
          placeholder="Contact Info"
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
