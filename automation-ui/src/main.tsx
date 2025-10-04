import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import ConfigureTemplate from './pages/ConfigureTemplate';
import MyAutomations from './pages/MyAutomations';
import Designer from './pages/Designer';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

const router = createHashRouter([
  { path: '/login', element: <Login /> },
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/configure/:templateKey', element: <ConfigureTemplate /> },
      { path: '/automations', element: <MyAutomations /> },
      { path: '/designer', element: <Designer /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
  { path: '*', element: <Login /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
