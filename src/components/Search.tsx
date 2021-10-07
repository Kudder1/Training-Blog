import React from 'react';
import Burger from './Burger';

const Search = () => {
    return (
        <div className="search-bar">
            <Burger />
            <div className="search-bar__item">
                <input className="search" type="search" placeholder="Search" />
            </div>
        </div>
    );
};

export default Search;