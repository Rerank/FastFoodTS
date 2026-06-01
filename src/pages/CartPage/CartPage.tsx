import { useCart } from '@/context/useCart';
import { IMAGE_BASE_URL, PLACEHOLDER_PRODUCT_IMAGE } from '@/utils/constants';
import { formatPrice } from '@/utils/formatters';
import { useOrderTotals } from '@/utils/useOrderTotals';
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
import './CartPage.css'

const CartPage = () => {

    const { cartItems, updateQuantity } = useCart();

    const {
        totalItems,
        itemsPrice,
        finalPrice,
        deliveryCost,
        isFreeDelivery,
        twoForOneDiscount,
        comboDiscount,
        isTwoForOneApplied,
        isComboApplied
    } = useOrderTotals(cartItems);



    return (

        <div>
            <main className="cart-page">
                <section
                    className="cart-section"
                    {...(cartItems.length >= 1
                        ? { 'aria-labelledby': 'cart-title' }
                        : { 'aria-label': 'Корзина' })}
                >
                    {cartItems.length < 1 ? (
                        <div className="cart-empty" role="status" aria-live="polite">
                            <img
                                className="cart-empty__image"
                                src={`${IMAGE_BASE_URL}empty-cart.webp`}
                                alt=""
                            />
                            <p className="cart-empty__text">Корзина пуста</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-section__header">
                                <h1 className="cart-section__title" id="cart-title">Ваш заказ</h1>
                                <span className="cart-section__count">{totalItems} товара</span>
                            </div>

                            <div className="cart-list">
                                {cartItems.map((item) => (
                                <article key={item.id} className="cart-item">
                                    <ImageWithFallback
                                    className="cart-item__image"
                                    name={item.image_name}
                                    fallback={PLACEHOLDER_PRODUCT_IMAGE}
                                    alt={item.title} />
                                    <div className="cart-item__content">
                                        <h2 className="cart-item__title">{item.title}</h2>
                                        <p className="cart-item__price">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="cart-quantity" aria-label="Количество">
                                        <button
                                            className="cart-quantity__button tap-effect tap-effect--strong"
                                            onClick={() => updateQuantity(item.id, -1)}
                                            type="button"
                                            aria-label="Уменьшить количество"
                                        >-</button>
                                        <span className="cart-quantity__value">{item.quantity}</span>
                                        <button
                                            className="cart-quantity__button tap-effect tap-effect--strong"
                                            onClick={() => updateQuantity(item.id, 1)}
                                            type="button"
                                            aria-label="Увеличить количество"
                                        >+</button>
                                    </div>
                                </article>
                                ))}
                            </div>
                        </>
                    )}

                </section>
                {cartItems.length > 0 ? (
                    <form className="cart-summary" action="#" method="post">
                        <div className="cart-total cart-total--secondary">
                            <span className="cart-total__label">Стоимость товаров</span>
                            <span className="cart-total__price">{formatPrice(itemsPrice)}</span>
                        </div>

                        {isTwoForOneApplied && (
                            <div className="cart-total cart-total--secondary">
                                <span className="cart-total__label">
                                    2 по цене 1
                                </span>
                                <span className="cart-total__price cart-total__price--discount">
                                    -{formatPrice(twoForOneDiscount)}
                                </span>
                            </div>
                        )}
                        {isComboApplied && (
                            <div className="cart-total cart-total--secondary">
                                <span className="cart-total__label">
                                    Комбо скидка
                                </span>
                                <span className="cart-total__price cart-total__price--discount">
                                    -{formatPrice(comboDiscount)}
                                </span>
                            </div>
                        )}
                        <div className="cart-total cart-total--secondary">
                            <span className="cart-total__label">Доставка</span>
                            <span className="cart-total__price">
                                {isFreeDelivery ? 'Бесплатно' : `${formatPrice(deliveryCost)}`}
                            </span>
                        </div>
                        <div className="cart-total">
                            <span className="cart-total__label">Итого</span>
                            <span className="cart-total__price">{formatPrice(finalPrice)}</span>
                        </div>

                        <label className="cutlery-option">
                            <input className="cutlery-option__checkbox" type="checkbox" name="cutlery" />
                            <span className="cutlery-option__control" aria-hidden="true"></span>
                            <span className="cutlery-option__text">Добавить столовые приборы</span>
                        </label>

                        <button className="order-button" type="submit">Заказать</button>
                    </form>
                ) : null}
            </main>
        </div>
    )
}

export default CartPage;