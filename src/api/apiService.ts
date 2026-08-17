import type { ApiService } from '@/api/types';
import { httpApiService } from '@/api/HttpApiService';
import { mockApiService } from '@/api/MockApiService';

// Демо-режим: данные берутся из мока, сервера нет.
// Флаг рядом с самим переключателем, чтобы условие не разъехалось по компонентам.
export const IS_DEMO = import.meta.env.VITE_DATA_SOURCE === 'mock';

export const apiService: ApiService = IS_DEMO ? mockApiService : httpApiService;


