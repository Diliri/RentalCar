'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchCarById } from '@/services/api';
import RentalForm from '@/components/RentalForm/RentalForm';
import styles from './page.module.css';

export default function CarDetailsPage() {
  const SVG_PATH: string = '/symbol-defs.svg';
  const { carId } = useParams() as { carId: string };

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  if (isLoading) return <div className={styles.container}>Loading details...</div>;
  if (isError || !car) return <div className={styles.container}>Car not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <Image 
              src={car.img} 
              alt={`${car.brand} ${car.model}`} 
              fill 
              sizes="(max-width: 768px) 100vw, 540px"
              className={styles.image} 
              priority
            />
          </div>
          <RentalForm carId={car.id} />
        </div>

        <div className={styles.right}>
            <div className={styles.titleRow}>
              <h2>{car.brand} {car.model}, {car.year}</h2>
              <span className={styles.article}>Article: {car.id}</span>
            </div>

            <div className={styles.location}>
              <svg className={styles.svg} width="16" height="16">
                <use href={`${SVG_PATH}#icon-location`} />
              </svg>
              <span>
                {typeof car.location === 'object' 
                  ? `${car.location.city}, ${car.location.country}` 
                  : car.location}
              </span>
            </div>

            <div className={styles.price}>${car.rentalPrice}</div>

          {car.description && (
            <p className={styles.description}>{car.description}</p>
          )}
          <section className={styles.section}>
            <h4>Rental Conditions:</h4>
            <ul className={styles.rentalList}>
              {car.rentalConditions.map((cond, idx) => (
                <li key={idx} className={styles.rentalItem}>
                  <svg className={styles.svg}>
                    <use href={`${SVG_PATH}#icon-succeed`}></use>
                  </svg>
                  {cond}
                </li>
              ))}
            </ul>
            
          </section>
          <hr className={styles.hr}/>

          <section className={`${styles.section} ${styles.specification}`}>
            <h4>Car Specifications:</h4>
            <div className={styles.boxSvg}>
              <svg className={styles.svg}>
                <use href={`${SVG_PATH}#icon-calendar`}></use>
              </svg>
              <p>Year: {car.year}</p>
            </div>

            <div className={styles.boxSvg}>
              <svg className={styles.svg}>
                <use href={`${SVG_PATH}#icon-car`}></use>
              </svg>
              <p>Type: {car.type}</p>
            </div>

            <div className={styles.boxSvg}>
              <svg className={styles.svg}>
                <use href={`${SVG_PATH}#icon-fuel-pump`}></use>
              </svg>
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </div>

            <div className={styles.boxSvg}>
              <svg className={styles.svg}>
                <use href={`${SVG_PATH}#icon-gear`}></use>
              </svg>
              <p>Engine: {car.engine}</p>
            </div>
              
            <div className={styles.boxSvg}>
              <svg className={styles.svg}>
                <use href={`${SVG_PATH}#icon-road`}></use>
              </svg>
              <p>Mileage: {car.mileage.toLocaleString()} km</p>
            </div>  
            
          </section>
          <hr className={styles.hr}/>

          

          <section className={styles.section}>
            <h4>Features:</h4>
            <ul className={styles.featuresList}>
              {car.features.map((feat, idx) => (
                <li key={idx} className={styles.featuresItem}>
                  <svg className={styles.svg}>
                    <use href={`${SVG_PATH}#icon-succeed`}></use>
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}