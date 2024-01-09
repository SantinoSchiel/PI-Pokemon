import React, { useEffect, useState } from 'react';
import style from './Search.module.css';
import { useDispatch } from "react-redux";
import {filterType} from '../../redux/actions';

function SearchBar({ pokemons, onDataFromSearchBar }) {

    const dispatch = useDispatch();

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
            window.alert(`There are no pokemons with the following name: ${searchTerm}`);
        }

        setSearchTerm('');
    }

    useEffect(() => {
        onDataFromSearchBar(searchResults);
    }, [searchResults]);

    const handleFilter = event => {
        dispatch(filterType(event.target.value))
    }


    return (
        <div className={style.container}>

            <div>
                <select name="filterApiOrDb">
                    <option value="All"> All </option>
                    <option value="API"> API </option>
                    <option value="DB"> DB </option>
                </select>
                <select name="filterType" onChange={handleFilter}>
                    <option value="All"> All </option>
                    <option value="normal">normal</option>
                    <option value="fighting">fighting</option>
                    <option value="flying">flying</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="psychic">psychic</option>
                    <option value="ice">ice</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="Unknow">Unknow</option>
                    <option value="shadow">shadow</option>
                </select>
            </div>

            <input value={searchTerm} type='search' placeholder="name..." onChange={onSearch} />
            <button onClick={searchName}>Search</button>

        </div>
    );
}

export default SearchBar;