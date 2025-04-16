import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import { Login } from './login/login';
import { Home } from './home/home';
import { AccountCreation } from './accountCreation/accountCreation';
import { AccountSettings } from './accountSettings/accountSettings';
import { Chat } from './chat/chat';
import { CourseSettings } from './courseSettings/courseSettings';
import { SignOut } from './signout/signout';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-light text-dark min-vh-100 d-flex flex-column">
        <header className="bg-success text-white shadow">
          <div className="container py-3">
            <h1 className="text-center mb-3">Student Scheduler</h1>
            <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
              <div className="container-fluid justify-content-center">
                {/* Hamburger Toggle Button */}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mainNavbar"
                  aria-controls="mainNavbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
                  <ul className="navbar-nav flex-lg-row">
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/">Login</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/accountCreation" style={{ whiteSpace: "nowrap" }}>
                        Create Account
                      </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/accountSettings">Settings</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/chat">Chat</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/courseSettings">Courses</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink className="nav-link" to="/signout" style={{ whiteSpace: "nowrap" }}>
                        Sign Out
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/accountCreation" element={<AccountCreation />} />
            <Route path="/accountSettings" element={<AccountSettings />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/courseSettings" element={<CourseSettings />} />
            <Route path="/about" element={<About />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3">
          <div className="container">
            <span>© 2025 Scheduler Startup</span> |{" "}
            <a className="text-reset" href="https://github.com/webprogramming260/startup-react">Source</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
