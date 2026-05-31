import { IMAGE_BASE_URL } from '@/utils/constants'
import './ErrorState.css';

const ErrorState = ({ message }: { message: string }) => {
    return (
        <div className="error-state">
            <img
                className="error-state__illustration"
                src={`${IMAGE_BASE_URL}critical-error.webp`}
                alt=""
                decoding="async"
            />
            <h2 className="error-state__title">Упс, что-то пошло не так</h2>
            <p className="error-state__message">{message}</p>
            <button className="error-state__button" onClick={() => window.location.reload()}>
                Попробовать снова
            </button>
        </div>
    );
};

export default ErrorState;