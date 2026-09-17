import React from 'react';

export const Logs: React.FC = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>System Logs</h1>
      <p style={{ color: 'var(--text-secondary)' }}>System and tenant activity logs will be displayed here.</p>
    </div>
  );
};
