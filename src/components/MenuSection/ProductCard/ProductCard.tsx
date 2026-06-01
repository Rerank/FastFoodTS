import { IMAGE_BASE_URL, PLACEHOLDER_PRODUCT_IMAGE } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'
import type { Product } from '@/types/product';
import { useState, useRef, type MouseEvent } from 'react'
import { useCart } from '@/context/useCart'
import Link from '@/router/Link'
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
import { TAP_EFFECT_DELAY } from '@/utils/constants'
import './ProductCard.css'


const ProductCard = ({ product }: { product: Product }) => {
  const { id, image_name, title, weight, price } = product;
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  //Используем useRef для избежания бага связанного с отложенным вызовом useState
  const feedbackTimerRef = useRef<number | null>(null);

  const handleAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Предотвращаем переход по ссылке <Link>, если кнопка случайно оказалась внутри нее
    e.stopPropagation(); // Останавливаем всплытие события (на всякий случай)

    addToCart(product, 1);

    //Ставим метку для отображения визуального эффекта добавления в корзину
    setIsAdded(true);

    //Увеличиваем счетчик добавленных товаров
    setAddedCount(prevCount => prevCount + 1);

    //Очищаем предыдущий таймер, если визуальный эффект еще не закончился, а пользователь нажал на кнопку еще раз
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }

    //Устанавливаем таймер для скрытия визуального эффекта через 1.5 секунды
    feedbackTimerRef.current = setTimeout(() => {
      setIsAdded(false);
      setAddedCount(0);
      feedbackTimerRef.current = null;
    }, 1000);


  };

  return (
    <article className="product-card">
      <ImageWithFallback
      className="product-card__image"
      name={image_name}
      fallback={PLACEHOLDER_PRODUCT_IMAGE}
      alt={title} />
      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/product/${id}`} className="product-card__link" delay={TAP_EFFECT_DELAY}>{title}</Link>
        </h3>
        <p className="product-card__weight">{weight}</p>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(price)}</span>
          <button
            className={`add-button tap-effect tap-effect--strong ${isAdded ? 'is-added' : ''}`}
            type="button"
            aria-label={`Добавить ${title} в корзину`}
            onClick={handleAddClick}
          >
            <span className={`add-button__label ${isAdded ? 'is-added' : ''}`}>
              {isAdded ? `+${addedCount}` : '+'}
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard;