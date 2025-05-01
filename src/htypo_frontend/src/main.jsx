import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthClient } from "@dfinity/auth-client";
import App from './components/App';
import "./index.scss";

const init = async () => {
  const authClient = await AuthClient.create();
  if (authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      }
    });
  }
}

async function handleAuthenticated(client) {
  const identity = await client.getIdentity();
  const userPrincipal = identity.getPrincipal();
  const userPrincipalStr = userPrincipal.toString();
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App loggedInPrincipal={userPrincipalStr} />
    </React.StrictMode>,
  );
}

init();
