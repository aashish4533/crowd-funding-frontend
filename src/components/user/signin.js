import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages
    try {
      const response = await axios.post('http://localhost:5000/api/user/signin', formData);
      
      if (response.data.success) {
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        onSignIn(); // Update state in App.js
        navigate('/dashboard');
    }
     else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: '#e74c3c',
    fontSize: '14px',
  },
};

export default Signin;
