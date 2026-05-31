import PromoCard from './PromoCard/PromoCard'
import type { Promotion } from '@/types/promotion';
import { useDragToScroll } from '@/utils/useDragToScroll'
import { useState, useEffect, useRef, memo } from 'react'
import { apiService } from '@/api/apiService'
import './PromoCarousel.css'


const PromoCarousel = () => {

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLElement>(null);

  const dragEvents = useDragToScroll(carouselRef);

  useEffect(() => {
    const fetchPromotions = async () => {
      const apiResult = await apiService.getPromotions();

      setPromotions(apiResult.data ?? [])
      setIsLoading(false);
    };
    fetchPromotions();
  }, []);

  if (!isLoading && promotions.length === 0) {
    return null;
  }
  return (
    <section
      className="promo-carousel"
      aria-label="Акции и специальные предложения"
      ref={carouselRef}
      {...dragEvents}
    >

      {isLoading ? (<article className="promo-card" style={{ visibility: 'hidden' }}></article>)
        : (promotions.map((promo) => (
          <PromoCard
            key={promo.id}
            type={promo.type}
            label={promo.label}
            title={promo.title}
            description={promo.description}
            imageName={promo.image_name}
          />
        )))}
    </section>
  )
}

export default memo(PromoCarousel);