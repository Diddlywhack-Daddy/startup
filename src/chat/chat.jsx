import React, { useState } from 'react';
import './chat.css';

export function Chat({ userName }) {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'System', text: 'Welcome to the chat room!' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    // Add message to chat log
    setChatLog((prev) => [
      ...prev,
      { sender: userName || 'Anonymous', text: message.trim() },
    ]);

    // Clear message input
    setMessage('');
  };

  return (
    <main className="container-fluid text-center py-4">
      <h1>Welcome to Live Chat</h1>

      <section id="chat" className="text-start mx-auto mb-4" style={{ maxWidth: '700px' }}>
        <h2>Chat Room</h2>
        <div
          id="chat-messages"
          className="border rounded p-2 mb-3 bg-white"
          style={{ height: '300px', overflowY: 'auto' }}
        >
          {chatLog.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>

        <form id="chat-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Type your message:</label>
            <input
              type="text"
              id="message"
              name="message"
              className="form-control"
              placeholder="Enter your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">Send</button>
          </div>
        </form>
      </section>

      <footer className="mt-5 text-muted">
        <p>&copy; 2024 Scheduler Startup. All rights reserved.</p>
      </footer>
    </main>
  );
}
