import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-h1kihg426xuqx2n0.us.auth0.com';
const clientId = 'P1ZQJGQ05k2euytM30fOyEDV3pzJlhYS';

const {protocol, host} = window.location
const location = `${protocol}//${host}`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // redirectUri={window.location.href || window.location.pathname}
      authorizationParams={{redirect_uri: location}}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
