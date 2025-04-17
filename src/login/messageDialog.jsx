import React from 'react';


export function MessageDialog({ message, onClose }) {
    return (
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  