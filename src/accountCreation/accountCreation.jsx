import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './accountCreation.css';

export function AccountCreation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // ✅ Placeholder for DB save
    console.log('Account created:', formData);

    alert('Account successfully created! Redirecting to login...');
    navigate('/');
  };

  return (
    <main className="container-fluid text-center py-4">
      <h1>Create Account</h1>

      <p>
        <a href="/">Back</a>
      </p>

      <section id="account-creation" className="mx-auto text-start" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email (optional):</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Create Account</button>
          </div>
        </form>

        <p className="mt-3 text-muted">We will not share your personal information.</p>
      </section>

      <footer className="mt-5 text-muted">
        <p>&copy; 2024 Scheduler Startup. All rights reserved.</p>
      </footer>
    </main>
  );
}
