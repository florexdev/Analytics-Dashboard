export interface Tenant {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'enterprise';
  isActive: boolean;
}

export const mockTenants: Tenant[] = [
  { id: 't-001', name: 'Acme Corp', plan: 'enterprise', isActive: true },
  { id: 't-002', name: 'Global Tech', plan: 'pro', isActive: true },
  { id: 't-003', name: 'Startup Inc', plan: 'basic', isActive: false },
];
