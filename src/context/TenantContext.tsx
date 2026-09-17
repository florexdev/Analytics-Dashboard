import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Tenant, mockTenants } from '../types/tenant';

interface TenantContextType {
  currentTenant: Tenant;
  tenants: Tenant[];
  setTenant: (id: string) => void;
  addTenant: (tenant: Tenant) => void;
  updateTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load tenants from localStorage or fallback to mockTenants
  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const saved = localStorage.getItem('tenants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockTenants;
      }
    }
    return mockTenants;
  });

  // Load current tenant ID from localStorage or fallback to first tenant
  const [currentTenant, setCurrentTenant] = useState<Tenant>(() => {
    const savedId = localStorage.getItem('currentTenantId');
    if (savedId) {
      const found = tenants.find(t => t.id === savedId);
      if (found) return found;
    }
    return tenants[0];
  });

  // Save to localStorage whenever tenants change
  useEffect(() => {
    localStorage.setItem('tenants', JSON.stringify(tenants));
  }, [tenants]);

  // Save to localStorage whenever currentTenant changes
  useEffect(() => {
    localStorage.setItem('currentTenantId', currentTenant.id);
  }, [currentTenant]);

  const setTenant = (id: string) => {
    const tenant = tenants.find((t) => t.id === id);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const addTenant = (newTenant: Tenant) => {
    setTenants(prev => [...prev, newTenant]);
    setCurrentTenant(newTenant);
  };

  const updateTenant = (updatedTenant: Tenant) => {
    setTenants(prev => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
    if (currentTenant.id === updatedTenant.id) {
      setCurrentTenant(updatedTenant);
    }
  };

  return (
    <TenantContext.Provider value={{ currentTenant, tenants, setTenant, addTenant, updateTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
