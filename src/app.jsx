import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

import { Authenticated } from './login/authenticated';
import { Unauthenticated } from './login/unauthenticated';

export default function App() {
  const [userName, setUserName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Authenticated userName={userName} setUserName={setUserName} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Unauthenticated setUserName={setUserName} setIsAuthenticated={setIsAuthenticated} />
      )}
    </BrowserRouter>
  );
}
