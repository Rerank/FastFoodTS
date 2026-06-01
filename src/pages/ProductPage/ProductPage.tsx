import { useState, useEffect, type SubmitEvent } from 'react'
import { apiService } from '@/api/apiService'
import { useCart } from '@/context/useCart'
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { PLACEHOLDER_PRODUCT_IMAGE } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'
import ErrorState from '@/components/common/ErrorState/ErrorState';
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
import Link from '@/router/Link'
import './ProductPage.css'


const ProductPage = ({ productId }: { productId: string }) => {

    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleIncrease = () => {
        if (selectedQuantity < 20) setSelectedQuantity(prev => prev + 1);
    };
    const handleDecrease = () => {
        if (selectedQuantity > 1) setSelectedQuantity(prev => prev - 1);
    };

    const handleAddToCart = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isAdded) return;

        if (!product) return;

        addToCart(product, selectedQuantity);

        setSelectedQuantity(1);

        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const [productResult, categoriesResult] = await Promise.all([
                apiService.getProductById(Number(productId)),
                apiService.getCategories(),
            ]);

            // критична только ошибка товара
            if (productResult.error || !productResult.data) {
                setError(productResult.error ?? 'Не удалось загрузить товар');
                setIsLoading(false);
                return;
            }
            setProduct(productResult.data);
            setCategories(categoriesResult.data ?? []);
            setIsLoading(false);
        }
        fetchProduct();
    }, [productId]);

    if (error) {
        return <div className="app"><main className="product-page"><ErrorState message={error} /></main></div>;
    }

    // Пока данные грузятся, показываем заглушку
    if (isLoading || !product) {
        return <div className="app"><main className="product-page">Загрузка...</main></div>;
    }

    // Находим название категории для продукта
    const categoryTitle = categories.find(c => c.id === product.category_id)?.title ?? '';


    return (
        <>
            <header className="product-header">
                <Link to="/" className="product-header__back tap-effect" aria-label="Назад" >‹</Link>
                <span className="product-header__title">{product.title}</span>
            </header>

            <main className="product-page">
                <article className="product-details">
                    <div className="product-details__media">
                        <ImageWithFallback
                            className="product-details__image"
                            name={product.image_name}
                            fallback={PLACEHOLDER_PRODUCT_IMAGE}
                            alt={product.title} />
                    </div>

                    <div className="product-details__body">
                        <p className="product-details__category">{categoryTitle}</p>
                        <h1 className="product-details__title">{product.title}</h1>
                        <p className="product-details__description">
                            {product.description}
                        </p>



                        <div className="product-details__meta">
                            <span className="product-details__weight">{product.weight}</span>
                            {/* <span className="product-details__size">25 см</span> */}
                        </div>

                        <p className="product-details__price">{formatPrice(product.price)}</p>

                        <form className="product-order" onSubmit={handleAddToCart}>
                            <div className="quantity-field" aria-label="Количество порций">
                                <span className="quantity-field__label">Количество</span>
                                <div className="quantity-control">
                                    <button
                                        className="quantity-control__button tap-effect tap-effect--strong"
                                        type="button"
                                        onClick={handleDecrease}
                                        aria-label="Уменьшить количество"
                                    >-</button>
                                    <input
                                        className="quantity-control__value"
                                        type="number"
                                        name="quantity"
                                        min="1" max="20"
                                        value={selectedQuantity}
                                        readOnly
                                        aria-label="Текущее количество"
                                    />
                                    <button
                                        className="quantity-control__button tap-effect tap-effect--strong"
                                        type="button"
                                        onClick={handleIncrease}
                                        aria-label="Увеличить количество"
                                    >+</button>
                                </div>
                            </div>

                            <button
                                className={`cart-button tap-effect tap-effect--weak ${isAdded ? 'is-added' : ''}`}
                                disabled={isAdded}
                                type="submit"
                            >
                                <span>{isAdded ? 'Добавлено ✓' : 'В корзину'}</span>
                            </button>
                        </form>
                    </div>
                </article>
            </main>
        </>
    )
}

export default ProductPage;