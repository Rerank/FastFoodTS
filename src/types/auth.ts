import type { User } from './user';
import type { ApiError } from '../api/types';

export type AuthStatus = 'loading' | 'authenticated' | 'guest' | 'unavailable';

export type AuthContextValue = {
    status: AuthStatus; 
    user: User | null;
    error: ApiError | null; // заполнено только при status === 'unavailable'
    login: (phone: string, password: string) => Promise<ApiError | null>;
    register: (name: string, phone: string, password: string) => Promise<ApiError | null>;
    logout: () => Promise<void>;
};