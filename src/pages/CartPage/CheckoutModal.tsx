import { type MouseEvent } from 'react';
import './CheckoutModal.css';

export type CheckoutStatus = 'idle' | 'processing' | 'success' | 'error';

interface CheckoutModalProps {
    status: Exclude<CheckoutStatus, 'idle'>;
    errorMessage: string | null;
    onRetry: () => void;
    onViewOrders: () => void;
    onClose: () => void;
}

const CheckoutModal = ({ status, errorMessage, onRetry, onViewOrders, onClose }: CheckoutModalProps) => {
    // Закрывать можно всё, КРОМЕ обработки: пока идёт запрос, окно блокирующее.
    const isClosable = status !== 'processing';

    // Клик по затемнённому фону закрывает окно — но только по самому фону,
    // не по карточке (e.target === e.currentTarget), и только в закрываемых состояниях.
    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (isClosable && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Оформление заказа"
            onClick={handleOverlayClick}
        >
            <div className="checkout-modal__card">
                {status === 'processing' && (
                    <>
                        <span className="checkout-modal__spinner" aria-hidden="true"></span>
                        <p className="checkout-modal__title" aria-live="polite">Обработка заказа…</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <span className="checkout-modal__icon checkout-modal__icon--success" aria-hidden="true">✓</span>
                        <p className="checkout-modal__title">Заказ создан</p>
                        <button
                            className="checkout-modal__button tap-effect"
                            type="button"
                            onClick={onViewOrders}
                        >Посмотреть заказы</button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <span className="checkout-modal__icon checkout-modal__icon--error" aria-hidden="true">!</span>
                        <p className="checkout-modal__title">Не удалось создать заказ</p>
                        {errorMessage && (
                            <p className="checkout-modal__text" role="alert">{errorMessage}</p>
                        )}
                        <button
                            className="checkout-modal__button tap-effect"
                            type="button"
                            onClick={onRetry}
                        >Попробовать снова</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
