import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import App from './App';
import Products from "./routes/Products";
import Practice from "./routes/Practice";
import Reports from "./routes/Reports";
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
      <RouterProvider router={
        createBrowserRouter([
          {
            element: <App loggedInPrincipal={userPrincipalStr} />,
            children: [
              {
                path: "/",
                element: <Practice />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "reports",
                element: <Reports />,
              },
            ],
          },
        ])
      } />
    </React.StrictMode>,
  );
}

init();
