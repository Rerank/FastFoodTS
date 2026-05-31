import { useState, useEffect } from 'react'
import Link from '@/router/Link'
import { useCart } from '@/context/useCart'
import './BottomNav.css'
const BottomNav = () => {

    const [pathname, setPathname] = useState(window.location.pathname)
    const { cartItems } = useCart()

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    useEffect(() => {
        const handlePopState = () => {
          setPathname(window.location.pathname)
        }
        window.addEventListener('popstate', handlePopState)
        return () => {
          window.removeEventListener('popstate', handlePopState)
        }
      }, [])


      const getNavItemClass = (path: string) => {
        return `bottom-nav__item ${pathname === path ? 'active' : ''}`
      }

    return (
        <nav className="bottom-nav" aria-label="Основная навигация">
            <Link to="/profile" className={getNavItemClass('/profile')} >
                <span className="bottom-nav__icon bottom-nav__icon--profile" aria-hidden="true"></span>
                <span className="bottom-nav__label">Профиль</span>
            </Link>
            <Link to="/" className={getNavItemClass('/')} >
                <span className="bottom-nav__icon bottom-nav__icon--menu" aria-hidden="true"></span>
                <span className="bottom-nav__label">Меню</span>
            </Link>
            <Link to="/cart" className={getNavItemClass('/cart')} >
            <div className="bottom-nav__icon-wrapper">
                    <span className="bottom-nav__icon bottom-nav__icon--cart" aria-hidden="true"></span>
                    {totalItems > 0 && (
                        <span className="bottom-nav__badge">{totalItems}</span>
                    )}
                </div>
                <span className="bottom-nav__label">Корзина</span>
            </Link>
        </nav>
    )
}

export default BottomNav;