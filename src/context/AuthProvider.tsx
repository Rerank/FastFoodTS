import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './useAuth';
import { apiService } from '@/api/apiService';
import type { User } from '@/types/user';
import type { AuthStatus } from '@/types/auth';
import type { ApiError } from '@/api/types';

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<AuthStatus>('loading');
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<ApiError | null>(null);

    // Спрашиваем сервер один раз при запуске. Кука httpOnly — другого способа
    // узнать, вошёл ли пользователь, у клиента нет.
    useEffect(() => {
        const checkSession = async () => {
            const result = await apiService.getCurrentUser();

            if (result.data) {
                setUser(result.data);
                setStatus('authenticated');
                return;
            }

            // если сбой не связан с аутентификацией
            if (result.error && result.error.kind !== 'auth') {
                setError(result.error);
                setStatus('unavailable');
                return;
            }

            setStatus('guest');
        };

        checkSession();
    }, []);   // пустой массив зависимостей: проверка ровно одна за запуск

    const login = async (phone: string, password: string): Promise<ApiError | null> => {
        const result = await apiService.login(phone, password);

        // возвращаем ошибку форме
        if (!result.data) {
            return result.error;
        }

        setUser(result.data);
        setStatus('authenticated');
        return null; //успешный вход
    };

    const register = async (name: string, phone: string, password: string): Promise<ApiError | null> => {
        const result = await apiService.register(name, phone, password);

        // возвращаем ошибку форме
        if (!result.data) {
            return result.error;
        }

        setUser(result.data);
        setStatus('authenticated');
        return null; //успешный вход

    };

    const logout = async () => {
        setUser(null);
        setStatus('guest');

        // Результат намеренно игнорируем: из аккаунта надо выйти в любом случае
        await apiService.logout();

    };

    return (
        <AuthContext.Provider value={{ status, user, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;