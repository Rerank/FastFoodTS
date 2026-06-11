import type { Order } from '@/types/order';
import { formatPrice, ORDER_STATUS_LABELS, pluralize, formatOrderDate } from '@/utils/formatters';

const OrderCard = ({ order }: { order: Order }) => {
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <article className="order-card">
            <header className="order-card__top">
                <div className="order-card__info">
                    <h2 className="order-card__number">Заказ №{order.id}</h2>
                    <p className="order-card__date">{formatOrderDate(order.createdAt)}</p>
                </div>
                <span className={`order-status order-status--${order.status}`}>{ORDER_STATUS_LABELS[order.status]}</span>
            </header>

            <ul className="order-card__products">
                {order.items.map((item) => (
                    <li className="order-card__product" key={item.productId}>
                        <span>{item.title}</span>
                        <span className="order-card__product-qty">× {item.quantity}</span>
                    </li>

                ))}
            </ul>
            <footer className="order-card__bottom">
                <span className="order-meta__label">{totalItems} {pluralize(totalItems, ['товар', 'товара', 'товаров'])}</span>
                <span className="order-meta__total">{formatPrice(order.total)}</span>
            </footer>
        </article>

    );
};

export default OrderCard;