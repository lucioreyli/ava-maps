import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootPage } from './routes';
import './index.css';

const rootEl = document.getElementById('root');

const router = createBrowserRouter([
  { path: '/ava-maps/', Component: RootPage },
]);

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
