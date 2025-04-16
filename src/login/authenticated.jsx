import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import { Home } from '../home/home';
import { AccountCreation } from '../accountCreation/accountCreation';
import { AccountSettings } from '../accountSettings/accountSettings';
import { Chat } from '../chat/chat';
import { CourseSettings } from '../courseSettings/courseSettings';
import { SignOut } from '../signout/signout';
import { About } from '../about/about';

export function Authenticated({ userName, setUserName, setIsAuthenticated }) {
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
                                to="/home"
                                className="navbar-brand mb-0 h1 text-white text-decoration-none"
                                style={{ cursor: 'pointer' }}
                            >
                                Student Scheduler
                            </NavLink>
                        </div>

                        <span className="text-white me-3">
                            Hello, {userName}!
                        </span>




                        <ul className="navbar-nav flex-row flex-wrap justify-content-end">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/courseSettings">Courses</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/chat">Chat</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/accountSettings">Settings</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/signout" style={{ whiteSpace: 'nowrap' }}>
                                    Sign Out
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container my-4 flex-grow-1">
                <Routes>
                    <Route path="/home" element={<Home userName={userName} />} />
                    <Route path="/accountCreation" element={<AccountCreation />} />
                    <Route path="/accountSettings" element={<AccountSettings userName={userName} />} />
                    <Route path="/chat" element={<Chat userName={userName} />} />
                    <Route path="/courseSettings" element={<CourseSettings userName={userName} />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/signout"
                        element={<SignOut setUserName={setUserName} setIsAuthenticated={setIsAuthenticated} />}
                    />
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
