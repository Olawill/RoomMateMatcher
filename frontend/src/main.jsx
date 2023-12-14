import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

// REACT_APP_AUTH0_DOMAIN=dev-h1kihg426xuqx2n0.us.auth0.com
// REACT_APP_AUTH0_CLIENT_ID=P1ZQJGQ05k2euytM30fOyEDV3pzJlhYS

const domain = 'dev-h1kihg426xuqx2n0.us.auth0.com';
const clientId = 'P1ZQJGQ05k2euytM30fOyEDV3pzJlhYS';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
