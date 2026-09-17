import React from 'react';
import { useTenant } from '../context/TenantContext';
import styles from './Settings.module.css';

export const Settings: React.FC = () => {
  const { currentTenant } = useTenant();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tenant Settings</h1>
        <p className={styles.subtitle}>Manage configuration and preferences for {currentTenant.name}.</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>General Information</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Tenant Name</label>
          <input type="text" className={styles.input} defaultValue={currentTenant.name} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tenant ID</label>
          <input type="text" className={styles.input} defaultValue={currentTenant.id} disabled style={{ opacity: 0.7, cursor: 'not-allowed' }} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Subscription Plan</label>
          <select className={styles.input} defaultValue={currentTenant.plan}>
            <option value="basic">Basic Plan</option>
            <option value="pro">Pro Plan</option>
            <option value="enterprise">Enterprise Plan</option>
          </select>
        </div>

        <button className={styles.saveBtn}>Save Changes</button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Regional Settings</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Timezone</label>
          <select className={styles.input} defaultValue="UTC">
            <option value="UTC">UTC (Universal Coordinated Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
          </select>
        </div>

        <button className={styles.saveBtn}>Update Region</button>
      </div>
    </div>
  );
};
