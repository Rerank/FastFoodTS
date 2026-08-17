import MenuPage from '../pages/MenuPage/MenuPage'
import CartPage from '../pages/CartPage/CartPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import OrdersPage from '../pages/OrdersPage/OrdersPage'
import Protected from './Protected'
import LoginPage from '@/pages/Auth/LoginPage'
import ProfileSkeleton from '@/pages/ProfilePage/ProfileSkeleton'
import OrdersSkeleton from '@/pages/OrdersPage/OrdersSkeleton'
import { useCurrentPath } from './useCurrentPath'
import { navigate } from './navigate'


const Router = () => {
    const path = useCurrentPath()

    const normalizedPath = path.endsWith('/') && path !== '/'
        ? path.slice(0, -1)
        : path;

    if (normalizedPath === '/') return <MenuPage />;
    if (normalizedPath === '/cart') return <CartPage />;
    if (normalizedPath === '/login') return <LoginPage onSuccess={() => navigate('/')} />;
    if (normalizedPath === '/profile') return <Protected fallback={<ProfileSkeleton />}><ProfilePage /></Protected>;
    if (normalizedPath === '/orders') return <Protected fallback={<OrdersSkeleton />}><OrdersPage /></Protected>;

    if (normalizedPath.startsWith('/product/')) {
        const productId = path.split('/').pop() ?? '';
        return <ProductPage productId={productId} />;
    }
    // Если ни один путь не подошел
    return <NotFoundPage />;
}

export default Router;