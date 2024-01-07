import React, { useEffect, useState } from 'react';
import style from './Search.module.css'

function SearchBar({ pokemons, onDataFromSearchBar }) {

    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState([]);


    const onSearch = (event) => {
        const value = event.target.value;

        setSearchTerm(value);
    };



    const searchName = async () => {

        const pokemonName = pokemons.filter(pokemon => pokemon.name === searchTerm)

        if (pokemonName.length) {
            setSearchResults(pokemonName);
        } else {
            window.alert(`No hay pokemons con el siguiente nombre: ${searchTerm}`);
        }

        setSearchTerm('');
    }

    useEffect(() => {
        onDataFromSearchBar(searchResults);
    }, [searchResults]);

    // const sendDataToHome = () => {

    //     onDataFromSearchBar(searchResults);

    // };

    // const bothFunctions = async () => {
    //     await searchName();
    //     sendDataToHome();

    // }


    return (
        <div className={style.container}>

            <input value={searchTerm} type='search' placeholder="name..." onChange={onSearch} />
            <button onClick={searchName}>Search</button>

        </div>
    );
}

export default SearchBar;