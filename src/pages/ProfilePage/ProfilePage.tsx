import { IMAGE_BASE_URL, PLACEHOLDER_AVATAR_IMAGE, TAP_EFFECT_DELAY } from '@/utils/constants'
import { useAuth } from '@/context/useAuth'
import Link from '@/router/Link'
import { navigate } from '@/router/navigate'
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;


  return (
    <main className="profile-page">
      <section className="profile-hero" aria-labelledby="profile-name">
        <ImageWithFallback
          className="profile-hero__avatar"
          name={user.avatar_file_name}
          fallback={PLACEHOLDER_AVATAR_IMAGE}
          alt="Аватар пользователя" />

        <div className="profile-hero__content">
          <h2 className="profile-hero__name" id="profile-name">{user.name}</h2>
          <p className="profile-hero__phone">{user.phone}</p>
          <button className="profile-hero__edit" type="button">Изменить</button>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="profile-details-title">
        <div className="profile-section__header">
          <h2 className="profile-section__title" id="profile-details-title">Информация</h2>
        </div>

        <div className="profile-list">
          <Link to="/orders" className="profile-item tap-effect tap-effect--weak" delay={TAP_EFFECT_DELAY}>
            <span className="profile-item__icon" aria-hidden="true">
              <img className="profile-item__icon-image" src={`${IMAGE_BASE_URL}orders.svg`} alt="" />
            </span>
            <div className="profile-item__content">
              <p className="profile-item__text">Мои заказы</p>
              <p className="profile-item__meta">Список и статусы заказов</p>
            </div>
          </Link>
          <article className="profile-item">
            <span className="profile-item__icon" aria-hidden="true">
              <img className="profile-item__icon-image" src={`${IMAGE_BASE_URL}location.svg`} alt="" />
            </span>
            <div className="profile-item__content">
              <p className="profile-item__text">Адрес доставки</p>
              <p className="profile-item__meta">ул. Ленина, 12, кв. 45</p>
            </div>
          </article>

          <article className="profile-item">
            <span className="profile-item__icon" aria-hidden="true">
              <img className="profile-item__icon-image" src={`${IMAGE_BASE_URL}card.svg`} alt="" />
            </span>
            <div className="profile-item__content">
              <p className="profile-item__text">Карта оплаты</p>
              <p className="profile-item__meta">Visa •••• 4582</p>
            </div>
          </article>

          <article className="profile-item">
            <span className="profile-item__icon" aria-hidden="true">
              <img className="profile-item__icon-image" src={`${IMAGE_BASE_URL}support.svg`} alt="" />
            </span>
            <div className="profile-item__content">
              <p className="profile-item__text">Поддержка</p>
              <p className="profile-item__meta">Чат с оператором</p>
            </div>
          </article>
        </div>
      </section>

      <button className="profile-logout" type="button" onClick={async () => { await logout(); navigate('/login'); }}>Выйти</button>

    </main>
  )
}

export default ProfilePage;