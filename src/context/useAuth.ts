import { createContext, useContext } from 'react';
import type { AuthContextValue } from '@/types/auth';

// undefined используется, если вызов контекста произойдёт вне провайдера
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// можно было бы обойтись вызовом useContext(AuthContext) в компоненте, но тогда нужно проверять на undefined
// этот хук сужает тип и гарантирует, что обращение к контексту будет внутри провайдера
export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};