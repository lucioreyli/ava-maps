import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen.ts';
import './index.css';

const router = createRouter({ routeTree, basepath: '/ava-maps/' });

const rootEl = document.getElementById('root');
document.body.classList.add('dark');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
