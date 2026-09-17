import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTenant } from '../context/TenantContext';
import styles from './DataTable.module.css';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

// Generate a large mock dataset (10,000 items) to demonstrate virtual scrolling
const generateMockData = (tenantId: string): Order[] => {
  const statuses: Order['status'][] = ['Completed', 'Pending', 'Failed'];
  return Array.from({ length: 10000 }).map((_, index) => ({
    id: `ORD-${tenantId}-${10000 + index}`,
    customer: `Customer ${index + 1}`,
    amount: Number((Math.random() * 500 + 10).toFixed(2)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  }));
};

const mockCache: Record<string, Order[]> = {};
const getTenantData = (id: string) => {
  if (!mockCache[id]) {
    mockCache[id] = generateMockData(id);
  }
  return mockCache[id];
};

export const DataTable: React.FC = () => {
  const { currentTenant } = useTenant();
  const data = getTenantData(currentTenant.id);
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52, // estimated row height in px
    overscan: 5,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Transactions</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing {data.length.toLocaleString()} records via Virtual Scrolling
        </span>
      </div>

      <div ref={parentRef} className={styles.tableWrapper}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          
          <table className={styles.table} style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Order ID</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            
            <tbody style={{ transform: `translateY(${rowVirtualizer.getVirtualItems()[0]?.start || 0}px)` }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = data[virtualRow.index];
                return (
                  <tr key={virtualRow.key} className={styles.tr} style={{ height: `${virtualRow.size}px` }}>
                    <td className={styles.td}>{item.id}</td>
                    <td className={styles.td}>{item.customer}</td>
                    <td className={styles.td}>{item.date}</td>
                    <td className={styles.td}>${item.amount.toFixed(2)}</td>
                    <td className={styles.td}>
                      <span className={`${styles.statusBadge} ${styles[`status${item.status}`]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};
