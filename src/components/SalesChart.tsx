import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { useTenant } from '../context/TenantContext';
import styles from './ChartCard.module.css';

const mockSalesData = {
  't-001': [
    { name: 'Jan', current: 4000, previous: 2400 },
    { name: 'Feb', current: 3000, previous: 1398 },
    { name: 'Mar', current: 2000, previous: 9800 },
    { name: 'Apr', current: 2780, previous: 3908 },
    { name: 'May', current: 1890, previous: 4800 },
    { name: 'Jun', current: 2390, previous: 3800 },
    { name: 'Jul', current: 3490, previous: 4300 },
  ],
  't-002': [
    { name: 'Jan', current: 2400, previous: 1400 },
    { name: 'Feb', current: 1398, previous: 2398 },
    { name: 'Mar', current: 9800, previous: 2000 },
    { name: 'Apr', current: 3908, previous: 2780 },
    { name: 'May', current: 4800, previous: 1890 },
    { name: 'Jun', current: 3800, previous: 2390 },
    { name: 'Jul', current: 4300, previous: 3490 },
  ],
  't-003': [
    { name: 'Jan', current: 1400, previous: 1200 },
    { name: 'Feb', current: 1800, previous: 1400 },
    { name: 'Mar', current: 2200, previous: 1800 },
    { name: 'Apr', current: 2400, previous: 2000 },
    { name: 'May', current: 2100, previous: 1900 },
    { name: 'Jun', current: 2800, previous: 2200 },
    { name: 'Jul', current: 3100, previous: 2400 },
  ]
};

export const SalesChart = () => {
  const { currentTenant, isDemo } = useTenant();
  const { t } = useTranslation();
  const [filter, setFilter] = useState('7d');

  const data = useMemo(() => {
    const points = filter === '7d' ? 7 : filter === '30d' ? 30 : 90;
    
    if (!isDemo) {
      return Array.from({ length: points }).map((_, i) => ({
        name: `Day ${i + 1}`,
        current: 0,
        previous: 0,
      }));
    }

    const multiplier = currentTenant?.id === '1' ? 10000 : 5000;
    const base = currentTenant?.id === '1' ? 5000 : 2000;
    
    return Array.from({ length: points }).map((_, i) => ({
      name: `Day ${i + 1}`,
      current: Math.floor(Math.random() * multiplier) + base,
      previous: Math.floor(Math.random() * (multiplier / 10)) + (base / 10),
    }));
  }, [filter, currentTenant?.id, isDemo]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('revenue_overview')}</h3>
        <select 
          className={styles.filterSelect}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="7d">Last 7 Days (Mock)</option>
          <option value="30d">Last 30 Days (Mock)</option>
        </select>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
              itemStyle={{ color: 'var(--text-primary)', fontWeight: 500 }}
            />
            <Line type="monotone" dataKey="current" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Current Period" />
            <Line type="monotone" dataKey="previous" stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Previous Period" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
