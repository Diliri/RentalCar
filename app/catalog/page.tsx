'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/services/api';
import { CarQueryParams } from '@/types/car';
import CarCard from '@/components/CarCard/CarCard';
import Filters from '@/components/Filters/Filters';
import Loader from '@/components/Loader/Loader';
import styles from './page.module.css';
import Image from 'next/image';
import noCarImg from '../../public/no-car.png';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarQueryParams>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam = 1 }) => fetchCars({ ...filters, page: pageParam, perPage: 12 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
  });

  const allCars = data?.pages.flatMap((page) => page.cars) || [];

  return (
    <div className={styles.container}>
      <Filters onSearch={setFilters} />
      <section className={styles.allCarsSection}>
        {isLoading && <Loader />}
        {isError && !isLoading && (
          <div className={styles.error}>Failed to load cars. Check your connection or filters.</div>
        )}

        {!isLoading && !isError && allCars.length === 0 && (
          <div className={styles.notFound}>
            <Image src={noCarImg} alt="No cars found" width={414} height={388} />
            <p>No cars found matching your criteria.</p>
          </div>
        )}

        {!isLoading && !isError && allCars.length > 0 && (
          <>
            <div className={styles.grid}>
              {allCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <ScrollToTop />
          </>
        )}

        {hasNextPage && !isError && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMore}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
      </section>
    </div>
  );
}