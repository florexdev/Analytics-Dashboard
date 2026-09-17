import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Welcome to the analytics dashboard. Data will be populated here.</p>
    </div>
  );
};
