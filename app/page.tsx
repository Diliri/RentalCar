import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog" className={styles.btn}>
          View Catalog
        </Link>
      </div>
    </div>
  );
}