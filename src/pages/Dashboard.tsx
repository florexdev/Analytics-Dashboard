import React, { useMemo } from 'react';
import { DollarSign, Users, Activity, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTenant } from '../context/TenantContext';
import { KPICard } from '../components/KPICard';
import { SalesChart } from '../components/SalesChart';
import { UsersChart } from '../components/UsersChart';
import { DataTable } from '../components/DataTable';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { currentTenant, isDemo } = useTenant();
  const { t } = useTranslation();

  const currentData = useMemo(() => {
    if (!isDemo) {
      return {
        revenue: 0,
        sales: 0,
        users: 0,
        uptime: '100%',
        orders: 0,
        trends: [0, 0, 0, 0]
      };
    }
    
    // Mock data for demo mode
    const kpiData = {
      revenue: currentTenant?.id === '1' ? 124500 : 84200,
      sales: currentTenant?.id === '1' ? 1420 : 856,
      users: currentTenant?.id === '1' ? 12450 : 8200,
      uptime: '99.9%',
      orders: currentTenant?.id === '1' ? 342 : 156,
      trends: [12.5, 8.2, 0.1, -2.4]
    };
    return kpiData;
  }, [currentTenant?.id, isDemo]);

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>{t('Dashboard Overview')}</h1>
        <p className={styles.subtitle}>{t("Welcome back. Here's what's happening with {{name}} today.", { name: currentTenant.name })}</p>
      </div>

      <div className={styles.grid}>
        <KPICard 
          title={t('Total Sales')} 
          value={currentData.sales} 
          trend={currentData.trends[0]} 
          icon={DollarSign} 
          iconColor="#10b981" 
          iconBgColor="rgba(16, 185, 129, 0.1)" 
        />
        <KPICard 
          title={t('Active Users')} 
          value={currentData.users} 
          trend={currentData.trends[1]} 
          icon={Users} 
          iconColor="#3b82f6" 
          iconBgColor="rgba(59, 130, 246, 0.1)" 
        />
        <KPICard 
          title={t('Total Orders')} 
          value={currentData.orders} 
          trend={currentData.trends[3]} 
          icon={ShoppingCart} 
          iconColor="#f59e0b" 
          iconBgColor="rgba(245, 158, 11, 0.1)" 
        />
        <KPICard 
          title={t('System Uptime')} 
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
