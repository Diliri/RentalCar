'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Rental<span className={styles.logoBlue}>Car</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>
            Home
          </Link>
          <Link href="/catalog" className={pathname === '/catalog' ? styles.active : ''}>
            Catalog
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}