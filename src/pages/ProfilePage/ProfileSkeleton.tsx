import './ProfileSkeleton.css';

const ProfileSkeleton = () => {
    return (
        <>
            <div className="app app--skeleton" aria-hidden="true">
                <main className="profile-page">
                    <section className="profile-hero">
                        <div className="profile-hero__avatar skeleton-shape"></div>

                        <div className="profile-hero__content">
                            <div className="skeleton-line skeleton-line--name"></div>
                            <div className="skeleton-line skeleton-line--phone"></div>
                            <div className="skeleton-pill skeleton-pill--edit"></div>
                        </div>
                    </section>

                    <section className="profile-section">
                        <div className="profile-section__header">
                            <div className="skeleton-line skeleton-line--section-title"></div>
                        </div>

                        <div className="profile-list">
                            <article className="profile-item">
                                <div className="profile-item__icon skeleton-shape"></div>
                                <div className="profile-item__content">
                                    <div className="skeleton-line skeleton-line--item-title"></div>
                                    <div className="skeleton-line skeleton-line--item-text"></div>
                                    <div className="skeleton-line skeleton-line--item-meta"></div>
                                </div>
                            </article>

                            <article className="profile-item">
                                <div className="profile-item__icon skeleton-shape"></div>
                                <div className="profile-item__content">
                                    <div className="skeleton-line skeleton-line--item-title"></div>
                                    <div className="skeleton-line skeleton-line--item-text"></div>
                                    <div className="skeleton-line skeleton-line--item-meta"></div>
                                </div>
                            </article>

                            <article className="profile-item">
                                <div className="profile-item__icon skeleton-shape"></div>
                                <div className="profile-item__content">
                                    <div className="skeleton-line skeleton-line--item-title"></div>
                                    <div className="skeleton-line skeleton-line--item-text"></div>
                                    <div className="skeleton-line skeleton-line--item-meta"></div>
                                </div>
                            </article>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default ProfileSkeleton;