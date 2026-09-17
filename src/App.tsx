import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Logs } from './pages/Logs';
import { Onboarding } from './pages/Onboarding';
import { TenantProvider, useTenant } from './context/TenantContext';

const AppRoutesContent = () => {
  const { currentTenant } = useTenant();

  if (!currentTenant) {
    return <Onboarding />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="/demo" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo');

  return (
    <TenantProvider isDemo={isDemo}>
      <AppRoutesContent />
    </TenantProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
