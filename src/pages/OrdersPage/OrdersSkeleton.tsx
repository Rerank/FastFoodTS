import './OrdersSkeleton.css'; 

const OrdersPage = () => {
  return (
<main className="orders-page">
      <section className="orders-section">
        <div className="orders-section__header">
          <div className="skeleton-line skeleton-line--title"></div>
          <div className="skeleton-pill skeleton-pill--count"></div>
        </div>

        <div className="orders-list">
          <article className="order-card">
            <header className="order-card__top">
              <div className="order-card__info">
                <div className="skeleton-line skeleton-line--order-number"></div>
                <div className="skeleton-line skeleton-line--order-date"></div>
              </div>
              <div className="skeleton-pill skeleton-pill--status"></div>
            </header>

            <div className="order-card__products">
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
            </div>

            <footer className="order-card__bottom">
              <div className="skeleton-line skeleton-line--meta-label"></div>
              <div className="skeleton-line skeleton-line--meta-total"></div>
            </footer>
          </article>

          <article className="order-card">
            <header className="order-card__top">
              <div className="order-card__info">
                <div className="skeleton-line skeleton-line--order-number"></div>
                <div className="skeleton-line skeleton-line--order-date"></div>
              </div>
              <div className="skeleton-pill skeleton-pill--status"></div>
            </header>

            <div className="order-card__products">
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
            </div>

            <footer className="order-card__bottom">
              <div className="skeleton-line skeleton-line--meta-label"></div>
              <div className="skeleton-line skeleton-line--meta-total"></div>
            </footer>
          </article>

          <article className="order-card">
            <header className="order-card__top">
              <div className="order-card__info">
                <div className="skeleton-line skeleton-line--order-number"></div>
                <div className="skeleton-line skeleton-line--order-date"></div>
              </div>
              <div className="skeleton-pill skeleton-pill--status"></div>
            </header>

            <div className="order-card__products">
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
              <div className="order-card__product">
                <div className="skeleton-line skeleton-line--product-name"></div>
                <div className="skeleton-line skeleton-line--product-qty"></div>
              </div>
            </div>

            <footer className="order-card__bottom">
              <div className="skeleton-line skeleton-line--meta-label"></div>
              <div className="skeleton-line skeleton-line--meta-total"></div>
            </footer>
          </article>
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;