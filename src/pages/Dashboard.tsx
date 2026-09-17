import React from 'react';
import { DollarSign, Users, Activity, ShoppingCart } from 'lucide-react';
import { useTenant } from '../context/TenantContext';
import { KPICard } from '../components/KPICard';
import { SalesChart } from '../components/SalesChart';
import { UsersChart } from '../components/UsersChart';
import { DataTable } from '../components/DataTable';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { currentTenant } = useTenant();

  // Mock data based on the current tenant to show reactivity
  const kpiData = {
    't-001': { sales: '$124,500', users: '12,450', uptime: '99.99%', orders: '1,240', trends: [12.5, 4.2, 0.01, -2.4] },
    't-002': { sales: '$45,200', users: '3,100', uptime: '99.95%', orders: '430', trends: [8.1, -1.2, -0.05, 5.4] },
    't-003': { sales: '$8,400', users: '450', uptime: '98.50%', orders: '84', trends: [-4.5, 15.2, 0, 1.2] },
  };

  const currentData = kpiData[currentTenant.id as keyof typeof kpiData] || kpiData['t-001'];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back. Here's what's happening with {currentTenant.name} today.</p>
      </div>

      <div className={styles.grid}>
        <KPICard 
          title="Total Sales" 
          value={currentData.sales} 
          trend={currentData.trends[0]} 
          icon={DollarSign} 
          iconColor="#10b981" 
          iconBgColor="rgba(16, 185, 129, 0.1)" 
        />
        <KPICard 
          title="Active Users" 
          value={currentData.users} 
          trend={currentData.trends[1]} 
          icon={Users} 
          iconColor="#3b82f6" 
          iconBgColor="rgba(59, 130, 246, 0.1)" 
        />
        <KPICard 
          title="Total Orders" 
          value={currentData.orders} 
          trend={currentData.trends[3]} 
          icon={ShoppingCart} 
          iconColor="#f59e0b" 
          iconBgColor="rgba(245, 158, 11, 0.1)" 
        />
        <KPICard 
          title="System Uptime" 
          value={currentData.uptime} 
          trend={currentData.trends[2]} 
          icon={Activity} 
          iconColor="#8b5cf6" 
          iconBgColor="rgba(139, 92, 246, 0.1)" 
        />
      </div>

      <div className={styles.chartsGrid}>
        <SalesChart />
        <UsersChart />
      </div>

      <DataTable />
    </div>
  );
};
