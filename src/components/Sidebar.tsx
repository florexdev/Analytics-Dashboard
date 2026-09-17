import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Settings, Activity, Building2, Languages } from 'lucide-react';
import { useTenant } from '../context/TenantContext';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const { currentTenant, tenants, setTenant } = useTenant();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  const navItems = [
    { path: '/', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/logs', label: t('logs'), icon: Activity },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Building2 size={24} />
        <span>AnalyticsPro</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <label className={styles.tenantLabel}>Current Tenant</label>
        <select 
          className={styles.tenantSelect}
          value={currentTenant.id}
          onChange={(e) => setTenant(e.target.value)}
        >
          {tenants.map(tenant => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={toggleLanguage}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <Languages size={16} />
          {i18n.language.toUpperCase()}
        </button>
      </div>
    </aside>
  );
};
