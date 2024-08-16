import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search apps..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;