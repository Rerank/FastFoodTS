import Link from '@/router/Link'
import { IMAGE_BASE_URL } from '@/utils/constants'
import './NotFoundPage.css'

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <img
                className="not-found__illustration"
                src={`${IMAGE_BASE_URL}404.webp`}
                alt=""
                decoding="async"
            />
            <h2 className="not-found__title">Страница не найдена</h2>
            <p className="not-found__message">
                Похоже, такой страницы не существует или она была перемещена.
            </p>
            <Link to="/" className="not-found__button">
                На главную
            </Link>
        </div>
    )
}

export default NotFoundPage;
