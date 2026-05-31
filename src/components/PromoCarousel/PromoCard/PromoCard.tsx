import { IMAGE_BASE_URL } from '@/utils/constants'
import './PromoCard.css'

interface PromoCardProps {
    type: string;
    label: string;
    title: string;
    description: string | null;
    imageName: string | null; 
  }

const PromoCard = ({ type, label, title, description, imageName }: PromoCardProps) => {
    return (
        <article className={`promo-card promo-card--${type}`}>
          <span className="promo-card__label">{label}</span>
          <h2 className="promo-card__title">{title}</h2>
          <p className="promo-card__text">{description}</p>
          <img className="promo-card__offer-image" src={`${IMAGE_BASE_URL}${imageName}`} alt="" aria-hidden="true"/>
        </article>
    )
}

export default PromoCard;