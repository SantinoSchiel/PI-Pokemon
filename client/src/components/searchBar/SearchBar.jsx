import React from 'react';
import style from './Search.module.css'

function SearchBar() {
    return (
        <div className={style.container}>

            <input value="" type='search' placeholder="nombre..." />
            <button >Buscar</button>

        </div>
    );
}

export default SearchBar;