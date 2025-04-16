import React from 'react';
import './accountCreation.css';

export function AccountCreation() {
  return (
    <main className="container-fluid text-center py-4">
      <h1>Create Account</h1>

      <p>
        <a href="/">Back</a>
      </p>

      <section id="account-creation" className="mx-auto text-start" style={{ maxWidth: '600px' }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" id="username" name="username" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email (optional):</label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" className="form-control" required />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Create Account</button>
          </div>
        </form>

        <p className="mt-3 text-muted">We will not share your personal information.</p>
      </section>

      <footer className="mt-5 text-muted">
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
      </footer>
    </main>
  );
}
