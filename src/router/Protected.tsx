import { type ReactNode } from 'react';
import { useAuth } from '@/context/useAuth';
import LoginPage from '@/pages/Auth/LoginPage';
import ErrorState from '@/components/common/ErrorState/ErrorState';

type ProtectedProps = {
    children: ReactNode;
    fallback: ReactNode;   // скелетон той страницы, которую прикрываем
};

const Protected = ({ children, fallback }: ProtectedProps) => {
    const { status, error } = useAuth();

    // ещё не знаем, вошёл ли пользователь — решать рано
    if (status === 'loading') return <>{fallback}</>;

    if (status === 'unavailable') {
        return <ErrorState message={error?.message ?? 'Не удалось получить данные'} />;
    }

    // url не меняем: после входа человек окажется там, куда шёл
    if (status === 'guest') return <LoginPage />;

    return <>{children}</>;
};

export default Protected;