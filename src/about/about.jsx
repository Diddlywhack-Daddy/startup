import React from 'react';
import './about.css';
import { NavLink } from 'react-router-dom';

export function About() {
  return (
    <main className="container-fluid text-center py-4">
      <h1>About This Website</h1>

      <p>
        <NavLink to="/">Back to Login</NavLink>
      </p>

      <section id="about" className="text-start mx-auto" style={{ maxWidth: '800px' }}>
        <h2>Website Creator</h2>
        <p>This website was created by Jacob Larson as a web programming project.</p>

        <h2>Project Background</h2>
        <p>
          College students have to deal with different professors using different classroom management systems with
          different grading scales. This website was designed to enable the student to put all of their homework
          information in one place and enable smart time management.
        </p>

        <h2>Use of AI</h2>
        <p>
          As the project was larger and more difficult than initially intended, ChatGPT was used to create a framework
          for some elements of the UI.
        </p>

        <h2>Privacy Promise</h2>
        <p>We promise to never sell your personal information.</p>

        <h2>Data Security</h2>
        <p>
          While steps were taken to make your data secure, this website was made by an amateur as a learning
          experience, and we cannot guarantee your data security.
        </p>
      </section>

      <footer className="mt-5 text-muted">
        <p>&copy; 2024 Jacob Larson. All rights reserved.</p>
      </footer>
    </main>
  );
}
