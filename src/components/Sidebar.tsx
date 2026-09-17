import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Settings, PieChart } from 'lucide-react';
import { useTenant } from '../context/TenantContext';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const { currentTenant, tenants, setTenant } = useTenant();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <PieChart size={24} />
        <span>AnalyticsPro</span>
      </div>
      
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/logs" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Activity size={20} />
          <span>System Logs</span>
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <div className={styles.tenantLabel}>Current Tenant</div>
        <select 
          className={styles.tenantSelect}
          value={currentTenant.id}
          onChange={(e) => setTenant(e.target.value)}
        >
          {tenants.map(t => (
            <option key={t.id} value={t.id}>{t.name} {t.isActive ? '' : '(Inactive)'}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};
