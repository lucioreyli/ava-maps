import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootPage } from './routes';
import './index.css';

const rootEl = document.getElementById('root');
document.body.classList.add('dark');

const router = createBrowserRouter([
  { path: '/ava-maps/', Component: RootPage },
]);

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
