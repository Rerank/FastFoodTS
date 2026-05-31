import { useState, memo, type ChangeEvent } from 'react';
import SearchResultsList from '../SearchResultsList/SearchResultsList'
import type { ProductWithCategoryTitle } from '@/types/product';
import './SearchField.css'

const SearchField = ({products}: { products: ProductWithCategoryTitle[] }) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [searchResults, setSearchResults] = useState<ProductWithCategoryTitle[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setSearchInputValue(rawValue);
        

        const searchQuery = rawValue.trim().toLowerCase();

        if (searchQuery.length > 1) {
        const foundProducts = products.filter(product => {
            const titleMatch = product.title.toLowerCase().includes(searchQuery);
            const descriptionMatch = product.description && product.description.toLowerCase().includes(searchQuery);
            return titleMatch || descriptionMatch;
        })
        setSearchResults(foundProducts);
        } else {
            setSearchResults([]);
        }

        
    }


    return (
        <>
        <label className="search-field" aria-label="Поиск блюд">
                <span className="search-field__icon" aria-hidden="true">⌕</span>
                <input
                className="search-field__input"
                type="search"
                value={searchInputValue}
                onChange={handleInputChange}
                placeholder="Поиск блюд" />
            </label>

            {searchResults.length > 0 && <SearchResultsList results={searchResults} />}
            </>
    )
}

export default memo(SearchField);