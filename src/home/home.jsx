import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <main className="container-fluid text-center py-4">
      <header className="bg-success text-white py-3 mb-4">
        <h1>Calendar Manager</h1>
      </header>

      <section id="assignments" className="text-start mx-auto mb-5" style={{ maxWidth: '700px' }}>
        <h2>Upcoming Assignments</h2>
        <div className="mb-3 d-flex flex-wrap gap-2">
          <button className="btn btn-success">Add Assignment</button>
          <button className="btn btn-danger">Remove Assignment</button>
          <button className="btn btn-warning">Mark Done</button>
          <button className="btn btn-secondary">Refresh</button>
        </div>
        <p className="text-muted">Replace with call to MongoDB for upcoming assignments</p>
      </section>

      <section id="courses" className="text-start mx-auto" style={{ maxWidth: '700px' }}>
        <h2>Your Courses</h2>
        <div className="mb-3 d-flex flex-wrap gap-2">
          <button className="btn btn-success">Add Course</button>
          <button className="btn btn-danger">Remove Course</button>
        </div>
        <ul className="list-group">
          <li className="list-group-item">Course 1: Current Grade: [Grade]</li>
          <li className="list-group-item">Course 2: Current Grade: [Grade]</li>
          <li className="list-group-item">Course 3: Current Grade: [Grade]</li>
          <li className="list-group-item">[Placeholder for more courses]</li>
        </ul>
      </section>
    </main>
  );
}
