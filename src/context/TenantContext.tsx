import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tenant, mockTenants } from '../types/tenant';

interface TenantContextType {
  currentTenant: Tenant;
  tenants: Tenant[];
  setTenant: (id: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenants] = useState<Tenant[]>(mockTenants);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(tenants[0]);

  const setTenant = (id: string) => {
    const tenant = tenants.find((t) => t.id === id);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  return (
    <TenantContext.Provider value={{ currentTenant, tenants, setTenant }}>
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
