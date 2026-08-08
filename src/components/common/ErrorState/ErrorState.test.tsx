import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorState from './ErrorState';

describe('ErrorState', () => {
    it('Показывает переданное сообщение', () => {
        // Act
        render(<ErrorState message="Не удалось загрузить данные." />);

        // Assert
        expect(screen.getByText('Не удалось загрузить данные.')).toBeInTheDocument();
    });

    it('Заголовок отображается', () => {
        // Act
        render(<ErrorState message="Не удалось загрузить данные." />);

        // Assert
        expect(screen.getByRole('heading', { name: 'Упс, что-то пошло не так' })).toBeInTheDocument();;
    });

    it('Кнопка «Попробовать снова» присутствует', () => {
        // Act
        render(<ErrorState message="Не удалось загрузить данные." />);

        // Assert
        expect(screen.getByRole('button', { name: 'Попробовать снова' })).toBeInTheDocument();;

    });
});