import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useTenant } from '../context/TenantContext';
import styles from './ChartCard.module.css';

const mockUsersData = {
  't-001': [
    { name: 'Mon', mobile: 4000, desktop: 2400 },
    { name: 'Tue', mobile: 3000, desktop: 1398 },
    { name: 'Wed', mobile: 2000, desktop: 9800 },
    { name: 'Thu', mobile: 2780, desktop: 3908 },
    { name: 'Fri', mobile: 1890, desktop: 4800 },
    { name: 'Sat', mobile: 2390, desktop: 3800 },
    { name: 'Sun', mobile: 3490, desktop: 4300 },
  ],
  't-002': [
    { name: 'Mon', mobile: 1200, desktop: 800 },
    { name: 'Tue', mobile: 900, desktop: 700 },
    { name: 'Wed', mobile: 1500, desktop: 1200 },
    { name: 'Thu', mobile: 1100, desktop: 950 },
    { name: 'Fri', mobile: 1800, desktop: 1600 },
    { name: 'Sat', mobile: 2000, desktop: 1900 },
    { name: 'Sun', mobile: 2200, desktop: 2100 },
  ],
  't-003': [
    { name: 'Mon', mobile: 100, desktop: 40 },
    { name: 'Tue', mobile: 150, desktop: 60 },
    { name: 'Wed', mobile: 120, desktop: 50 },
    { name: 'Thu', mobile: 200, desktop: 80 },
    { name: 'Fri', mobile: 250, desktop: 100 },
    { name: 'Sat', mobile: 300, desktop: 150 },
    { name: 'Sun', mobile: 350, desktop: 200 },
  ],
};

export const UsersChart = () => {
  const { currentTenant } = useTenant();
  const [filter, setFilter] = useState('7d');

  const data = useMemo(() => {
    const rawData = mockUsersData[currentTenant.id as keyof typeof mockUsersData] || mockUsersData['t-001'];
    // Very simple mock filtering
    if (filter === '30d') return rawData;
    return rawData.slice(Math.max(rawData.length - 5, 0));
  }, [currentTenant.id, filter]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Sessions</h3>
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
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
              itemStyle={{ color: 'var(--text-primary)', fontWeight: 500 }}
              cursor={{ fill: 'var(--bg-primary)' }}
            />
            <Bar dataKey="desktop" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} name="Desktop" stackId="a" />
            <Bar dataKey="mobile" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Mobile" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
