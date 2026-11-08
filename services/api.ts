import axios from 'axios';
import { Car, CarsResponse, FilterOptions, CarQueryParams, BookingData } from '@/types/car';

const BASE_URL = 'https://car-rental-api.goit.study';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchCars = async (params: CarQueryParams): Promise<CarsResponse> => {
  const cleanParams: Record<string, string | number> = {};

  if (params.brand) cleanParams.brand = params.brand;
  if (params.price) cleanParams.price = params.price;
  if (params.minMileage !== undefined) cleanParams.minMileage = params.minMileage;
  if (params.maxMileage !== undefined) cleanParams.maxMileage = params.maxMileage;
  if (params.page) cleanParams.page = params.page;
  if (params.perPage) cleanParams.perPage = params.perPage;

  const response = await api.get<CarsResponse>('/cars', { params: cleanParams });
  return response.data;
};

export const fetchCarFilters = async (): Promise<FilterOptions> => {
  const response = await api.get<FilterOptions>('/cars/filters');
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export const createBooking = async (carId: string, data: BookingData) => {
  const response = await api.post<{ message: string }>(`/cars/${carId}/booking-requests`, data);
  return response.data;
};