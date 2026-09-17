import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';
import { useTenant } from '../context/TenantContext';

export const Onboarding: React.FC = () => {
  const { addTenant } = useTenant();
  const { t } = useTranslation();
  
  const [newName, setNewName] = useState('');
  const [newPlan, setNewPlan] = useState<'basic' | 'pro' | 'enterprise'>('basic');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    addTenant({
      id: `t-${Date.now()}`,
      name: newName,
      plan: newPlan,
      isActive: true,
    });
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '32px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--accent-primary)', justifyContent: 'center' }}>
          <Building2 size={32} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AnalyticsPro</h1>
        </div>
        
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', textAlign: 'center' }}>{t('no_tenant_title')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
          {t('no_tenant_desc')}
        </p>

        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('new_tenant_name')}</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Acme Corp"
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('subscription_plan')}</label>
            <select 
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value as any)}
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            >
              <option value="basic">Basic Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>
          </div>

          <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#10b981', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 600, marginTop: '8px', cursor: 'pointer', border: 'none' }}>
            {t('create_tenant')}
          </button>
        </form>
      </div>
    </div>
  );
};
