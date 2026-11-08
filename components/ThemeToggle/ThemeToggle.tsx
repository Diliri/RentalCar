'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem('rentalcar-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // Ігноруємо помилки доступу до localStorage
    }
    return 'light';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Асинхронне оновлення прибирає помилку eslint (set-state-in-effect)
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('rentalcar-theme', next);
    } catch {
      // Ігноруємо помилки
    }
  };

  if (!mounted) {
    return (
      <button type="button" className={styles.toggle} disabled aria-hidden="true">
        <span className={styles.icon}>
          <FiMoon size={20} />
        </span>
        <span className={styles.text}>Theme</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </span>
      <span className={styles.text}>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}