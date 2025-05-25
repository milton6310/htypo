import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../declarations/htypo';
import { canisterId } from '../../declarations/htypo/index';
import './index.scss';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

const init = async () => {

  const authClient = await AuthClient.create();
  const isAuthenticated = await authClient.isAuthenticated();

  if (isAuthenticated) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider,
      onSuccess: handleAuthenticated(authClient)
    });
  }
}

async function handleAuthenticated(client) {
  const identity = client.getIdentity();
  const actor = createActor(canisterId, {
    agentOptions: {
      identity
    }
  });
  const principal = await actor.whoami();
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App loggedInPrincipal={principal} />
    </React.StrictMode>,
  );
}

init();
