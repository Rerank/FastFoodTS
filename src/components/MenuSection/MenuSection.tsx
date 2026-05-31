import ProductCard from './ProductCard/ProductCard'
import type { Product } from '@/types/product';
import './MenuSection.css'

interface MenuSectionProps {
  id: string;
  title: string;
  products: Product[];
  isPreview: boolean;
  onShowAllClick?: () => void; 
}

const MenuSection = ({ id, title, products, isPreview, onShowAllClick }: MenuSectionProps) => {
  return (
    <section className="menu-section" id={id} aria-labelledby={`${id}-title`}>      
      {isPreview && (
        <div className="section-heading">
        <h2 className="section-heading__title" id={`${id}-title`}>{title}</h2>
      </div>
      )}
      

      <div className="product-grid">

        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      {isPreview && (
        <button className="show-all-button tap-effect" type="button" onClick={onShowAllClick}>Смотреть все <span aria-hidden="true">+</span></button>
      )}
    </section>
  )
}

export default MenuSection;