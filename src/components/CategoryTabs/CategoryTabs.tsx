import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { Category } from '@/types/category';

import { useDragToScroll } from '@/utils/useDragToScroll'
import './CategoryTabs.css'


interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string | null;                       // slug активной категории или null
  setActiveCategory: (value: string | null) => void;   // сеттер из useState родителя
  ref: RefObject<HTMLElement | null>;
}

const CategoryTabs = ({ categories, activeCategory, setActiveCategory, ref }: CategoryTabsProps) => {

  const dragEvents = useDragToScroll(ref);

  const handleTabClick = (categorySlug: string) => {
    // Если кликнули по уже активному табу - сбрасываем (null)
    if (activeCategory === categorySlug) {
      setActiveCategory(null);
    } else {
      // Иначе - делаем его активным
      setActiveCategory(categorySlug);
    }
  };

  // Добавляем эффект для горизонтального скролла к активному табу
  useEffect(() => {
    // Если категория не выбрана или ref на <nav> ещё не привязан — ничего не делаем
    if (!activeCategory || !ref || !ref.current) return;
  
    // Сам контейнер табов (<nav className="category-tabs">)
    const tabsContainer = ref.current;
  
    // Находим активную кнопку таба по классу, который React уже успел отрисовать
    const activeTabElement = tabsContainer.querySelector<HTMLElement>('.category-tabs__item.active');
  
    // Если по какой-то причине активного таба в DOM нет — выходим
    if (!activeTabElement) return;
  
    // Центр активного таба по горизонтали внутри контейнера:
    // расстояние от левого края контейнера до левого края таба + половина ширины таба
    const activeTabCenter =
      activeTabElement.offsetLeft + activeTabElement.offsetWidth / 2;
  
    // Центр видимой области контейнера (то, что пользователь реально видит на экране)
    const containerCenter = tabsContainer.clientWidth / 2;
  
    // Прокручиваем ТОЛЬКО горизонтальный скролл контейнера табов.
    // Цель: сместить activeTabCenter под containerCenter (таб окажется примерно по центру полосы).
    tabsContainer.scrollTo({
      left: activeTabCenter - containerCenter,
      behavior: 'smooth',
    });
  }, [activeCategory, ref]); // Повторять при смене выбранной категории (и при обновлении ref)

  return (
    <nav 
    ref={ref}
    className="category-tabs" 
    aria-label="Категории блюд"
    {...dragEvents}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-tabs__item ${activeCategory === category.slug ? 'active' : ''}`}
          onClick={() => handleTabClick(category.slug)}
        >
          {category.title}
        </button>
      ))}
    </nav>
  )
}

export default CategoryTabs;