import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Tenant, mockTenants } from '../types/tenant';

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  setTenant: (id: string) => void;
  addTenant: (tenant: Tenant) => void;
  updateTenant: (tenant: Tenant) => void;
  isDemo: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode, isDemo: boolean }> = ({ children, isDemo }) => {
  const [tenants, setTenants] = useState<Tenant[]>(() => {
    if (isDemo) return mockTenants;
    
    const saved = localStorage.getItem('tenants_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return []; // Empty start for HR
  });

  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(() => {
    if (isDemo) return mockTenants[0];

    const savedId = localStorage.getItem('currentTenantId_v2');
    if (savedId) {
      // Find within current loaded tenants (not mock, unless demo)
      const saved = localStorage.getItem('tenants_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        const found = parsed.find((t: Tenant) => t.id === savedId);
        if (found) return found;
      }
    }
    return null;
  });

  // Re-sync on isDemo change
  useEffect(() => {
    if (isDemo) {
      setTenants(mockTenants);
      setCurrentTenant(mockTenants[0]);
    } else {
      const saved = localStorage.getItem('tenants_v2');
      const loadedTenants = saved ? JSON.parse(saved) : [];
      setTenants(loadedTenants);
      
      const savedId = localStorage.getItem('currentTenantId_v2');
      if (savedId && loadedTenants.length > 0) {
        setCurrentTenant(loadedTenants.find((t: Tenant) => t.id === savedId) || loadedTenants[0]);
      } else if (loadedTenants.length > 0) {
        setCurrentTenant(loadedTenants[0]);
      } else {
        setCurrentTenant(null);
      }
    }
  }, [isDemo]);

  // Save to localStorage whenever tenants change (if not in demo)
  useEffect(() => {
    if (!isDemo) {
      localStorage.setItem('tenants_v2', JSON.stringify(tenants));
    }
  }, [tenants, isDemo]);

  // Save to localStorage whenever currentTenant changes (if not in demo)
  useEffect(() => {
    if (!isDemo && currentTenant) {
      localStorage.setItem('currentTenantId_v2', currentTenant.id);
    }
  }, [currentTenant, isDemo]);

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
    if (currentTenant?.id === updatedTenant.id) {
      setCurrentTenant(updatedTenant);
    }
  };

  return (
    <TenantContext.Provider value={{ currentTenant, tenants, setTenant, addTenant, updateTenant, isDemo }}>
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
