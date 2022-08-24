import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <AuthContextProvider>
      <BrowserRouter>
      <CookiesProvider>
        <App />
        </CookiesProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.Fragment>
);

