import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Server, Database } from 'lucide-react';
import { useTenant } from '../context/TenantContext';
import styles from './Logs.module.css';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const mockMessages = [
  "User authentication successful.",
  "Database connection pool initialized.",
  "Payment gateway timeout.",
  "New tenant configuration loaded.",
  "Background job 'report_gen' started.",
  "Cache memory limit approaching 80%.",
  "Invalid API token received.",
  "API rate limit exceeded for endpoint /metrics."
];

export const Logs: React.FC = () => {
  const { currentTenant } = useTenant();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate initial logs
  useEffect(() => {
    const initialLogs: LogEntry[] = Array.from({ length: 20 }).map((_, i) => ({
      id: `log-init-${i}`,
      timestamp: new Date(Date.now() - (20 - i) * 5000).toISOString().split('T')[1].split('.')[0],
      level: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'ERROR' : 'WARN') : 'INFO',
      message: mockMessages[Math.floor(Math.random() * mockMessages.length)]
    }));
    setLogs(initialLogs);
  }, [currentTenant.id]);

  // Stream new logs
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().split('T')[1].split('.')[0],
          level: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'ERROR' : 'WARN') : 'INFO',
          message: `[${currentTenant.id}] ${mockMessages[Math.floor(Math.random() * mockMessages.length)]}`
        };
        // Keep only last 100 logs to prevent memory leaks
        return [...prev.slice(-99), newLog];
      });
    }, 2000); // New log every 2 seconds

    return () => clearInterval(interval);
  }, [currentTenant.id]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Health & Logs</h1>
        <p className={styles.subtitle}>Real-time infrastructure monitoring for {currentTenant.name}.</p>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Server Load</span>
          <span className={styles.metricValue}>24%</span>
          <span className={`${styles.metricStatus} ${styles.statusGood}`}><Server size={14} /> Normal</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Database Latency</span>
          <span className={styles.metricValue}>12ms</span>
          <span className={`${styles.metricStatus} ${styles.statusGood}`}><Database size={14} /> Optimal</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Error Rate</span>
          <span className={styles.metricValue}>0.14%</span>
          <span className={`${styles.metricStatus} ${styles.statusWarn}`}><Activity size={14} /> Monitoring</span>
        </div>
      </div>

      <div className={styles.logPanel}>
        <div className={styles.logHeader}>
          <div className={styles.logTitle}>
            <Terminal size={16} />
            system_stream.log
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.85rem' }}>
            <div className={styles.liveIndicator}></div>
            Live
          </div>
        </div>
        <div className={styles.logBody} ref={scrollRef}>
          {logs.map(log => (
            <div key={log.id} className={styles.logEntry}>
              <span className={styles.logTime}>[{log.timestamp}]</span>
              <span className={
                log.level === 'INFO' ? styles.logInfo :
                log.level === 'WARN' ? styles.logWarn : styles.logError
              }>
                {log.level.padEnd(5)}
              </span>
              <span className={styles.logMsg}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
