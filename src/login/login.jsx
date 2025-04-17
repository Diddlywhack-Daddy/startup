import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import './login.css';

export function Login({ setUserName, setIsAuthenticated }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [displayError, setDisplayError] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginOrCreate('/api/auth/login');
  }

  async function loginOrCreate(endpoint) {
    console.log('Attempting login/create to:', endpoint);
  
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.username, password: form.password }),
    });
  
    console.log('Response status:', response.status);
  
    if (response?.status === 200) {
      console.log('Login successful');
      localStorage.setItem('userName', form.username);
      setUserName(form.username);
      setIsAuthenticated(true);
      navigate('/home'); // Make sure you have a route for /home
    } else {
      let body = {};
      try {
        body = await response.json();
      } catch {
        console.warn('Empty or invalid JSON in error response');
      }
  
      const message = body?.msg || `Unexpected error: ${response.status}`;
      console.log('Login failed:', message);
      setDisplayError(`⚠ Error: ${message}`);
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
          We are completely open source! Check out our code on{' '}
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
            <Button type="submit" variant="success">Sign In</Button>
          </div>
        </form>
      </section>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
