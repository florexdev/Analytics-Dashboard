import React from 'react';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import styles from './KPICard.module.css';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage, positive or negative
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export const KPICard: React.FC<KPICardProps> = React.memo(({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  iconColor = 'var(--accent-primary)',
  iconBgColor = 'rgba(59, 130, 246, 0.1)'
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.iconWrapper} style={{ backgroundColor: iconBgColor, color: iconColor }}>
          <Icon size={22} />
        </div>
      </div>
      <div className={styles.valueContainer}>
        <span className={styles.value}>{value}</span>
        {trend !== undefined && (
          <span className={`${styles.trend} ${trend >= 0 ? styles.positive : styles.negative}`}>
            {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
});
