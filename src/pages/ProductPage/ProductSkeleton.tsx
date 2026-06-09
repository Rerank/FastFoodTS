import './ProductSkeleton.css';

// Скелетон страницы товара. Повторяет разметку ProductPage, но вместо контента —
// мерцающие блоки. Классы РАСКЛАДКИ (.product-details, .product-order и т.д.)
// переиспользуются из ProductPage.css: он уже импортирован в ProductPage.tsx,
// который и рендерит этот скелетон, поэтому стили гарантированно на месте.
// ProductSkeleton.css добавляет только сами «мерцающие» примитивы.
const ProductSkeleton = () => {
    return (
        <div className="app app--skeleton" aria-hidden="true">
            <header className="product-header">
                <div className="skeleton-block skeleton-block--back"></div>
                <div className="skeleton-line skeleton-line--header-title"></div>
            </header>

            <main className="product-page">
                <article className="product-details">
                    <div className="product-details__media">
                        <div className="product-details__image skeleton-block"></div>
                    </div>

                    <div className="product-details__body">
                        <div className="skeleton-pill skeleton-pill--category"></div>
                        <div className="skeleton-line skeleton-line--title"></div>

                        <div className="product-skeleton__description">
                            <div className="skeleton-line skeleton-line--text"></div>
                            <div className="skeleton-line skeleton-line--text"></div>
                            <div className="skeleton-line skeleton-line--text skeleton-line--text-short"></div>
                        </div>

                        <div className="product-details__meta">
                            <div className="skeleton-pill skeleton-pill--weight"></div>
                        </div>

                        <div className="skeleton-line skeleton-line--price"></div>

                        <div className="product-order">
                            <div className="skeleton-block skeleton-block--control"></div>
                            <div className="skeleton-block skeleton-block--control"></div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ProductSkeleton;
