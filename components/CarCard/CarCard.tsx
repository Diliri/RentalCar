import Image from 'next/image';
import { Car } from '@/types/car';
import styles from './CarCard.module.css';

export default function CarCard({ car }: { car: Car }) {
  const addressParts = car.location.address.split(', ');
  const city = car.location.city || addressParts[addressParts.length - 2] || '';
  const country = car.location.country || addressParts[addressParts.length - 1] || '';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={car.img} 
          alt={`${car.brand} ${car.model}`} 
          fill 
          sizes="(max-width: 768px) 100vw, 274px"
          className={styles.image} 
        />
      </div>
      <div className={styles.header}>
        <h3>
          {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
        </h3>
        <span className={styles.price}>${car.rentalPrice}</span>
      </div>
      <div className={styles.details}>
        <span>{city}</span> | <span>{country}</span> | <span>{car.rentalCompany}</span>
        <br />
        <span>{car.type}</span> | <span>{car.mileage.toLocaleString()} km</span>
      </div>
      <a
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Read more
      </a>
    </div>
  );
}