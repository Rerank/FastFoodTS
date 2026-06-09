import type { ApiService } from '@/api/types';
import { httpApiService } from '@/api/HttpApiService';
import { mockApiService } from '@/api/MockApiService';

export const apiService: ApiService =
  import.meta.env.VITE_DATA_SOURCE === 'mock' ? mockApiService : httpApiService;


