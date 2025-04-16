import React from 'react';
import './signout.css';
import { useNavigate, NavLink } from 'react-router-dom';

export function SignOut({ setUserName, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear fake auth (for now)
    setUserName(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userName');

    // Redirect to login
    navigate('/');
  };

  return (
    <main className="container-fluid text-center py-4">
      <header className="bg-success text-white py-3 mb-4">
        <h1>Sign Out</h1>
      </header>

      <section id="signout-message" className="text-start mx-auto mb-4" style={{ maxWidth: '500px' }}>
        <h2>Are you sure you want to sign out?</h2>
        <p>Click below to log out and return to the login page.</p>
        <div className="d-grid gap-2">
          <button onClick={handleLogout} className="btn btn-success">Sign Out</button>
          <NavLink to="/home" className="btn btn-outline-secondary">Cancel</NavLink>
        </div>
      </section>

      <footer className="text-muted mt-5">
        <p>&copy; 2024 Scheduler Startup. All rights reserved.</p>
      </footer>
    </main>
  );
}
