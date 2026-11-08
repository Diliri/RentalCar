'use client';

import { useState, useEffect } from 'react';
import { fetchCarFilters } from '@/services/api';
import { FilterOptions, CarQueryParams } from '@/types/car';
import styles from './Filters.module.css';

interface FiltersProps {
  onSearch: (filters: CarQueryParams) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [filterData, setFilterData] = useState<FilterOptions | null>(null);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  useEffect(() => {
    fetchCarFilters().then(setFilterData).catch(console.error);
  }, []);

  const handleSearch = () => {
    const min = minMileage ? Number(minMileage) : undefined;
    const max = maxMileage ? Number(maxMileage) : undefined;

    if ((min !== undefined && isNaN(min)) || (max !== undefined && isNaN(max))) {
      alert('Please enter valid mileage values.');
      return;
    }

    onSearch({
      ...(brand && { brand }),
      ...(price && { price: Number(price) }),
      ...(min !== undefined && { minMileage: min }),
      ...(max !== undefined && { maxMileage: max }),
    });
  };

  const handleReset = () => {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    onSearch({});
  };

  const priceOptions = [];
  if (filterData) {
    for (let p = filterData.price.min; p <= filterData.price.max; p += 10) {
      priceOptions.push(p);
    }
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.group}>
        <label>Car brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={styles.select}>
          <option value="">Choose a brand</option>
          {filterData?.brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>Price / 1 hour</label>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className={styles.select}>
          <option value="">Choose a price</option>
          {priceOptions.map((p) => (
            <option key={p} value={p}>
              To ${p}
            </option>
          ))}
        </select>
      </div> */}

      <div className={styles.group}>
        <label className={styles.carLabel}>Car brand</label>
        <div className={styles.selectWrapper}>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className={styles.select}>
            <option value="">Choose a brand</option>
            {filterData?.brands.map((b) => (
              <option className={styles.option} key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.carLabel}>Price / 1 hour</label>
        <div className={styles.selectWrapper}>
          <select value={price} onChange={(e) => setPrice(e.target.value)} className={styles.select}>
            <option value="">Choose a price</option>
            {priceOptions.map((p) => (
              <option className={styles.option} key={p} value={p}>
                To ${p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.carLabel}>Car mileage / km</label>
        <div className={styles.inputsGroup}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className={styles.inputLeft}
          />
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className={styles.inputRight}
          />
        </div>
      </div>
        
      <div className={styles.buttonsBox}>
            <button onClick={handleSearch} className={styles.searchBtn}>
            Search
          </button>
          <button onClick={handleReset} className={styles.resetBtn}>
            Clear filters
          </button>
      </div>
    </div>
  );
}