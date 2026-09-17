import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import styles from './Settings.module.css';

export const Settings: React.FC = () => {
  const { currentTenant, updateTenant, addTenant } = useTenant();
  
  // State for updating current tenant
  const [editName, setEditName] = useState(currentTenant.name);
  const [editPlan, setEditPlan] = useState(currentTenant.plan);
  
  // State for adding a new tenant
  const [newName, setNewName] = useState('');
  const [newPlan, setNewPlan] = useState<'basic' | 'pro' | 'enterprise'>('basic');

  // Update effect if current tenant changes via sidebar
  React.useEffect(() => {
    setEditName(currentTenant.name);
    setEditPlan(currentTenant.plan);
  }, [currentTenant]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenant({
      ...currentTenant,
      name: editName,
      plan: editPlan as 'basic' | 'pro' | 'enterprise',
    });
    alert('Tenant updated successfully!');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return alert('Please enter a tenant name.');
    
    const newId = `t-${Date.now()}`;
    addTenant({
      id: newId,
      name: newName,
      plan: newPlan,
      isActive: true,
    });
    
    setNewName('');
    setNewPlan('basic');
    alert('New tenant added and switched to it!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tenant Settings</h1>
        <p className={styles.subtitle}>Manage configuration and preferences for {currentTenant.name}.</p>
      </div>

      <form className={styles.card} onSubmit={handleUpdate}>
        <h2 className={styles.cardTitle}>Update Current Tenant</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Tenant Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tenant ID (Read Only)</label>
          <input 
            type="text" 
            className={styles.input} 
            value={currentTenant.id} 
            disabled 
            style={{ opacity: 0.7, cursor: 'not-allowed' }} 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Subscription Plan</label>
          <select 
            className={styles.input} 
            value={editPlan}
            onChange={(e) => setEditPlan(e.target.value as any)}
          >
            <option value="basic">Basic Plan</option>
            <option value="pro">Pro Plan</option>
            <option value="enterprise">Enterprise Plan</option>
          </select>
        </div>

        <button type="submit" className={styles.saveBtn}>Save Changes</button>
      </form>

      <form className={styles.card} onSubmit={handleAdd}>
        <h2 className={styles.cardTitle}>Add New Tenant</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>New Tenant Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. My New Startup"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Subscription Plan</label>
          <select 
            className={styles.input} 
            value={newPlan}
            onChange={(e) => setNewPlan(e.target.value as any)}
          >
            <option value="basic">Basic Plan</option>
            <option value="pro">Pro Plan</option>
            <option value="enterprise">Enterprise Plan</option>
          </select>
        </div>

        <button type="submit" className={styles.saveBtn} style={{ backgroundColor: '#10b981' }}>
          Create Tenant
        </button>
      </form>
    </div>
  );
};
