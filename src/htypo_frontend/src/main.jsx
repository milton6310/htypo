import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import App from './App';
import Practice from "./routes/Practice";
import Games from "./routes/Games";
import Essays from "./routes/Essays";
import Token from './routes/Token';
import Bookmarks from "./routes/Bookmarks";
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
                path: "games",
                element: <Games />,
              },
              {
                path: "essays",
                element: <Essays />,
              },
              {
                path: "token",
                element: <Token />,
              },
              {
                path: "bookmarks",
                element: <Bookmarks />,
              },
            ],
          },
        ])
      } />
    </React.StrictMode>,
  );
}

init();
