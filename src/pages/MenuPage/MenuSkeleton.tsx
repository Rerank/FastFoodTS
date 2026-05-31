import './MenuSkeleton.css';

const MenuSkeleton = () => {
    return (
        <>
            <div className="app app--skeleton" aria-hidden="true">
                <header className="skeleton-header">
                    <div className="skeleton-search"></div>
                </header>

                <main className="menu-page menu-page--with-fixed-menu-header">
                    <section className="menu-section">
                        <div className="section-heading">
                            <div className="skeleton-line skeleton-line--title"></div>
                        </div>

                        <div className="product-grid">
                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>

                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>

                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>

                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>

                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>

                            <article className="product-card">
                                <div className="product-card__image skeleton-block"></div>
                                <div className="product-card__body">
                                    <div className="skeleton-line skeleton-line--name"></div>
                                    <div className="skeleton-line skeleton-line--weight"></div>
                                    <div className="product-card__footer">
                                        <div className="skeleton-line skeleton-line--price"></div>
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default MenuSkeleton;