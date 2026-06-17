import { PRODUCTS_PREVIEW_LIMIT, TAP_EFFECT_DELAY } from '@/utils/constants'
import MenuHeader from '@/components/MenuHeader/MenuHeader'
import PromoCarousel from '@/components/PromoCarousel/PromoCarousel'
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs'
import MenuSection from '@/components/MenuSection/MenuSection'
import SearchField from '@/components/common/SearchField/SearchField'
import ErrorState from '@/components/common/ErrorState/ErrorState';
import MenuSkeleton from './MenuSkeleton';
import { useState, useEffect, useRef } from 'react'
import { apiService } from '@/api/apiService'
import type { Category } from '@/types/category'
import type { ProductWithCategoryTitle } from '@/types/product'

const MenuPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductWithCategoryTitle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, productsData] = await Promise.all([
        // возвращает данные в формате {data, error}
        apiService.getCategories(),
        apiService.getProducts()
      ]);

      
      if (categoriesData.error || productsData.error || !categoriesData.data || !productsData.data) {
        setError(categoriesData.error || productsData.error);
        setIsLoading(false);
        return;
      }

      // Выносим данные в отдельные переменные, т.к. TS не видит предыдущее сужение типа внутри map
      const loadedCategories = categoriesData.data; 
      const loadedProducts = productsData.data;

      setCategories(loadedCategories);

      const enrichedProducts = loadedProducts.map(product => {
        const category = loadedCategories.find(cat => cat.id === product.category_id);

        return {
          ...product,
          // Добавляем поле category_title к продукту
          category_title: category ? category.title : ''
        };
      });

      setProducts(enrichedProducts);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <>
        <main className="menu-page">
          <ErrorState message={error} />
        </main>
      </>
    );
  }

  if (isLoading) {
    return <MenuSkeleton />;
  }

  // Находим объект активной категории, если есть
  const currentCategoryObj = activeCategory ? categories.find(cat => cat.slug === activeCategory) : null;

  // Проверяем, есть ли объект активной категории и фильтруем продукты по id категории
  const filteredProducts = currentCategoryObj
    ? products.filter(product => product.category_id === currentCategoryObj.id)
    : [];

  const scrollToTabsIfNeeded = () => {
    if (!tabsRef.current) return;
    const rect = tabsRef.current.getBoundingClientRect();
    const headerEl = document.querySelector<HTMLElement>('.app-header');
    const headerHeight = headerEl?.offsetHeight ?? 0;
    if (rect.top < headerHeight) {
      window.scrollTo({
        top: window.scrollY + rect.top - headerHeight - 10,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <MenuHeader>
        <SearchField products={products} />
      </MenuHeader>

      <main className="menu-page menu-page--with-fixed-menu-header">
        <PromoCarousel />

        <CategoryTabs ref={tabsRef} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {currentCategoryObj ? (
          <MenuSection
            id={currentCategoryObj.slug}
            title={currentCategoryObj.title}
            products={filteredProducts}
            isPreview={false}
          />
        ) : (
          categories.map(category => {
            const categoryProducts = products.filter(product => product.category_id === category.id);
            const previewProducts = categoryProducts.slice(0, PRODUCTS_PREVIEW_LIMIT);

            if (categoryProducts.length === 0) {
              return null; // Если продуктов нет, ничего не рендерим
            }

            return (
              <MenuSection
                key={category.id}
                id={category.slug}
                title={category.title}
                products={previewProducts}
                isPreview={true}
                onShowAllClick={() => {
                  setTimeout(() => {
                    setActiveCategory(category.slug)
                    setTimeout(scrollToTabsIfNeeded, 0)
                  }, TAP_EFFECT_DELAY)
                }}
              />
            )
          })
        )}
      </main>
    </>
  )

}

export default MenuPage;