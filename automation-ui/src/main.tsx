import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { AppShell } from './components/AppShell';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import ConfigureTemplate from './pages/ConfigureTemplate';
import MyAutomations from './pages/MyAutomations';
import Designer from './pages/Designer';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Gallery /> },
          { path: '/gallery', element: <Gallery /> },
          { path: '/configure/:templateKey', element: <ConfigureTemplate /> },
          { path: '/automations', element: <MyAutomations /> },
          { path: '/designer', element: <Designer /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
    ],
  },
  { path: '*', element: <Login /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
