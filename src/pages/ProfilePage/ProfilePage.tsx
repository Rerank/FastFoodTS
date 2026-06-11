import { useState, useEffect } from 'react'
import { apiService } from '@/api/apiService'
import { IMAGE_BASE_URL, PLACEHOLDER_AVATAR_IMAGE } from '@/utils/constants'
import type { User } from '@/types/user';
import ProfileSkeleton from './ProfileSkeleton'
import ErrorState from '@/components/common/ErrorState/ErrorState';
import ImageWithFallback from '@/components/common/ImageWithFallback/ImageWithFallback'
import './ProfilePage.css'

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const apiResult = await apiService.getUser(1);

      if (apiResult.error) {
        setError(apiResult.error);
      } else {
        setUser(apiResult.data);
      }
      setIsLoading(false);
    }

    fetchUser();
  }, []);


  if (error) {
    return (
      <main className="profile-page">
        <ErrorState message={error} />
      </main>
    );
  }

  if (isLoading|| !user) {
    return <ProfileSkeleton />;
  }


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
        <article className="profile-item">
            <span className="profile-item__icon" aria-hidden="true">
              <img className="profile-item__icon-image" src={`${IMAGE_BASE_URL}orders.svg`} alt="" />
            </span>
            <div className="profile-item__content">
              <p className="profile-item__text">Мои заказы</p>
              <p className="profile-item__meta">Список и статусы заказов</p>
            </div>
          </article>
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

    </main>
  )
}

export default ProfilePage;