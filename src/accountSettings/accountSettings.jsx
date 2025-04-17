import React, { useState, useEffect } from 'react';
import './accountSettings.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function AccountSettings({ userName, setUserName }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: userName || '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: false,
  });

  const [message, setMessage] = useState('');

  // Load user info from backend on component mount
  useEffect(() => {
    async function loadUserInfo() {
      try {
        const res = await fetch('/api/account', {
          credentials: 'include',  // This ensures that cookies are included in the request
        });
        if (!res.ok) throw new Error('Failed to load user info');
        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          username: data.username,
          email: data.email,
          emailNotifications: data.emailNotifications,
        }));
      } catch (err) {
        console.error('Failed to load user info', err);
      }
    }
    loadUserInfo();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleInfoUpdate = async (e) => {
    e.preventDefault();

    // Send user info update to backend
    try {
      const res = await fetch('/api/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: form.username,
          email: form.email,
        }),
      });
      if (!res.ok) throw new Error('Failed to update user information');
      setUserName(form.username);
      setMessage('User information updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update user information', err);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/account/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      if (!res.ok) throw new Error('Failed to change password');
      alert('Password updated successfully');
    } catch (err) {
      console.error('Failed to change password', err);
    }
  };

  const handleNotificationUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/account/prefs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          emailNotifications: form.emailNotifications,
        }),
      });
      if (!res.ok) throw new Error('Failed to update preferences');
      alert('Notification preferences updated');
    } catch (err) {
      console.error('Failed to update preferences', err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('/api/account/delete', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete account');
      alert('Account deleted successfully');
      // Redirect user to home page after account deletion
      navigate('/home');
    } catch (err) {
      console.error('Failed to delete account', err);
    }
  };

  return (
    <main className="container-fluid text-start px-4 py-0">
      <div className="bg-success text-white w-100 px-4 py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="m-0">Account Settings</h1>
          <NavLink to="/home" className="btn btn-light text-success">
            Back to Home
          </NavLink>
        </div>
      </div>

      <section id="user-info" className="mb-5 mx-auto" style={{ maxWidth: '700px' }}>
        <h2>Update User Information</h2>
        <form onSubmit={handleInfoUpdate}>
          <div className="mb-3">
            <label htmlFor="username">Username:</label>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">Update Information</button>
          {message && (
            <div className="alert alert-success mt-3" role="alert">
              {message}
            </div>
          )}
        </form>
      </section>

      <section id="change-password" className="mb-5 mx-auto" style={{ maxWidth: '700px' }}>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-3">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="form-control"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-control"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">Change Password</button>
        </form>
      </section>

      <section id="notification-settings" className="mb-5 mx-auto" style={{ maxWidth: '700px' }}>
        <h2>Notification Settings</h2>
        <form onSubmit={handleNotificationUpdate}>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              className="form-check-input"
              checked={form.emailNotifications}
              onChange={handleChange}
            />
            <label htmlFor="emailNotifications" className="form-check-label">
              Email Notifications
            </label>
          </div>

          <button type="submit" className="btn btn-success me-2">Save Preferences</button>
          <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </form>
      </section>
    </main>
  );
}
