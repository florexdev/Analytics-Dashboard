import React from 'react';
import { Bell, Moon, Sun, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>{t('Welcome back, Admin') || 'Welcome back, Admin'}</div>
      
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={toggleLanguage} aria-label="Toggle Language" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
          <Languages size={18} />
          {i18n.language.toUpperCase()}
        </button>
        <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle Theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <div className={styles.profile}>
          <div className={styles.avatar}>AD</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Admin User</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@acme.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};
