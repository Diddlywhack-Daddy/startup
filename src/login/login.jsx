import React, { useState } from 'react';
import './login.css';
import { useNavigate, NavLink } from 'react-router-dom';

export function Login({ setUserName, setIsAuthenticated }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // ✅ Accept any credentials for now
    if (form.username && form.password) {
      setUserName(form.username);
      setIsAuthenticated(true);
      localStorage.setItem('userName', form.username); // optional: save it
      navigate('/home');
    } else {
      alert('Please enter both username and password.');
    }
  }

  return (
    <main className="container-fluid login-page text-center py-4">
      <header className="bg-success text-white py-3 mb-4">
        <h1>Welcome to Scheduler Startup</h1>
      </header>

      <section id="about" className="text-start mx-auto mb-4" style={{ maxWidth: '700px' }}>
        <h2>About</h2>
        <p>This website is a startup project designed to help you manage your school tasks efficiently.</p>
        <p>
          We are completely open source! Check out our code on{" "}
          <a
            href="https://github.com/Diddlywhack-Daddy/startup"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>.
        </p>
        <p>Join us to get started!</p>
      </section>

      <section id="create-account" className="mb-4">
        <h2>Create an Account</h2>
        <p>
          <NavLink to="/accountCreation">Click here to create an account</NavLink>
        </p>
      </section>

      <section id="login" className="text-start mx-auto" style={{ maxWidth: '400px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Sign In</button>
          </div>
        </form>
      </section>
    </main>
  );
}
