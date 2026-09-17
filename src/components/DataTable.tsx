import React, { useRef, useState, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useTenant } from '../context/TenantContext';
import styles from './DataTable.module.css';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

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

type SortConfig = { key: keyof Order; direction: 'asc' | 'desc' } | null;

export const DataTable: React.FC = () => {
  const { currentTenant } = useTenant();
  const rawData = getTenantData(currentTenant.id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const filteredAndSortedData = useMemo(() => {
    let result = rawData;

    // Filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.customer.toLowerCase().includes(lowercasedTerm) || 
          item.id.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Sort
    if (sortConfig !== null) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [rawData, searchTerm, sortConfig]);
  
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 5,
  });

  const handleSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Order) => {
    if (!sortConfig || sortConfig.key !== key) return <ChevronsUpDown size={14} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAndSortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `Transactions_${currentTenant.id}.xlsx`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Recent Transactions</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Showing {filteredAndSortedData.length.toLocaleString()} records
          </span>
        </div>
        <div className={styles.controls}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by customer or order..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              style={{ paddingLeft: 32 }}
            />
          </div>
          <button className={styles.exportBtn} onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div ref={parentRef} className={styles.tableWrapper}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          
          <table className={styles.table} style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th} onClick={() => handleSort('id')}>
                  <div className={styles.thContent}>Order ID {getSortIcon('id')}</div>
                </th>
                <th className={styles.th} onClick={() => handleSort('customer')}>
                  <div className={styles.thContent}>Customer {getSortIcon('customer')}</div>
                </th>
                <th className={styles.th} onClick={() => handleSort('date')}>
                  <div className={styles.thContent}>Date {getSortIcon('date')}</div>
                </th>
                <th className={styles.th} onClick={() => handleSort('amount')}>
                  <div className={styles.thContent}>Amount {getSortIcon('amount')}</div>
                </th>
                <th className={styles.th} onClick={() => handleSort('status')}>
                  <div className={styles.thContent}>Status {getSortIcon('status')}</div>
                </th>
              </tr>
            </thead>
            
            <tbody style={{ transform: `translateY(${rowVirtualizer.getVirtualItems()[0]?.start || 0}px)` }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = filteredAndSortedData[virtualRow.index];
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
              {filteredAndSortedData.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};
