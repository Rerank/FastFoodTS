import { PLACEHOLDER_PRODUCT_IMAGE } from '@/utils/constants'
import Link from '@/router/Link'
import type { ProductWithCategoryTitle } from '@/types/product';
import './SearchResultsList.css'
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
const SearchResultsList = ({ results }: { results: ProductWithCategoryTitle[] }) => {

    if (!results || results.length === 0) {
        return null; // Ничего не рендерим, если нет результатов
    }

    return (
        <div className="search-results" role="list" aria-label="Найденные товары">
            {results.map(product => (

                <Link to={`/product/${product.id}`} key={product.id} className="search-result" role="listitem">
                    <ImageWithFallback
                    className="search-result__image"
                    name={product.image_name}
                    fallback={PLACEHOLDER_PRODUCT_IMAGE}
                    alt={product.title} />
                    <div className="search-result__content">
                        <h2 className="search-result__title">{product.title}</h2>
                        <p className="search-result__category">{product.category_title}</p>
                    </div>
                    <span className="search-result__price">{product.price} ₽</span>
                </Link>


            ))}
        </div>

    )

}

export default SearchResultsList;