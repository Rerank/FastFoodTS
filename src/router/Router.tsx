import { useState, useEffect } from 'react'
import MenuPage from '../pages/MenuPage/MenuPage'
import CartPage from '../pages/CartPage/CartPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import ProductPage from '../pages/ProductPage/ProductPage'

const Router = () => {
    const [path, setPath] = useState(window.location.pathname)

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    const normalizedPath = path.endsWith('/') && path !== '/'
        ? path.slice(0, -1)
        : path;

    if (normalizedPath === '/') return <MenuPage />;
    if (normalizedPath === '/cart') return <CartPage />;
    if (normalizedPath === '/profile') return <ProfilePage />;

    if (normalizedPath.startsWith('/product/')) {
        const productId = path.split('/').pop() ?? '';
        return <ProductPage productId={productId} />;
    }
    // Если ни один путь не подошел
    return <NotFoundPage />;

}

export default Router;