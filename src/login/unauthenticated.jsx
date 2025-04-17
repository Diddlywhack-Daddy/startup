import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import { Login } from './login';
import { About } from '../about/about';
import { AccountCreation } from '../accountCreation/accountCreation';

export function Unauthenticated({ setUserName, setIsAuthenticated }) {
  return (
    <div className="body bg-light text-dark min-vh-100 d-flex flex-column">
      <header className="bg-success text-white shadow">
        <div className="container py-3">
          <nav className="navbar navbar-expand-lg navbar-dark justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }}
              />
              <NavLink
                to="/"
                className="navbar-brand mb-0 h1 text-white text-decoration-none"
                style={{ cursor: 'pointer' }}
              >
                Student Scheduler
              </NavLink>
            </div>
            <ul className="navbar-nav flex-row flex-wrap justify-content-end">
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Login setUserName={setUserName} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/accountCreation" element={<AccountCreation />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <span>© 2025 Scheduler Startup</span> |{' '}
          <a className="text-reset" href="https://github.com/webprogramming260/startup-react">Source</a>
        </div>
      </footer>
    </div>
  );
}