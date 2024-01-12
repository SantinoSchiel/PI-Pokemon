import React, { useEffect, useState } from 'react';
import style from './Search.module.css';
import { useDispatch } from "react-redux";
import { filterType, filterApiOrDb } from '../../redux/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SearchBar({ pokemons, onDataFromSearchBar }) {

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const [typesOptions, setTypesOptions] = useState([]);

    const [selectedApiOrDb, setSelectedApiOrDb] = useState(
        localStorage.getItem('selectedApiOrDb') || 'All'
    );

    const [selectedType, setSelectedType] = useState(
        localStorage.getItem('selectedType') || 'All'
    );

    const onSearch = (event) => {
        const value = event.target.value;

        setSearchTerm(value);
    };



    const searchName = async () => {

        try {
            if (!searchTerm.trim()) {
                window.alert('Por favor, ingrese un nombre de Pokémon válido.');
                return;
            }

            const pokemonName = pokemons.filter(pokemon => pokemon.name.toLowerCase() === searchTerm.toLowerCase())

            if (!pokemonName.length) {
                window.alert(`There are no visible pokemons with the following name: ${searchTerm}`);
            } else {
                const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${searchTerm}`);
                setSearchResults([data]);
            }
        } catch (error) {
            console.error('Error searching pokemon by name:', error.message);
        }

        setSearchTerm('');
    }

    useEffect(() => {
        onDataFromSearchBar(searchResults);
    }, [searchResults]);

    const handleFilter = event => {
        const selectedValue = event.target.value;
        dispatch(filterType(selectedValue));

        setSelectedType(selectedValue);
        localStorage.setItem('selectedType', selectedValue);
    }

    const handleFilterDbOrApi = event => {
        const selectedValue = event.target.value;
        dispatch(filterApiOrDb(selectedValue));

        setSelectedApiOrDb(selectedValue);
        localStorage.setItem('selectedApiOrDb', selectedValue);
    }

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/types');
                setTypesOptions(data);
            } catch (error) {
                console.error('Error fetching types:', error.message);
            }
        };

        fetchTypes();
    }, []);


    return (
        <div className={style.container}>

            <div className={style.select}>
                <select name="filterApiOrDb" onChange={handleFilterDbOrApi} value={selectedApiOrDb} >
                    <option value="All"> All </option>
                    <option value="API"> API </option>
                    <option value="DB"> DB </option>
                </select>
                <select name="filterType" onChange={handleFilter} value={selectedType} >
                    <option value="All"> All </option>
                    {typesOptions.map((type, index) => (
                        <option key={index} value={type.name.toLowerCase()}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <input value={searchTerm} type='search' placeholder="name..." onChange={onSearch} />
            <button onClick={searchName}>Search</button>

            <div>
                <Link to="/createPokemon">
                    <button>Create pokemon</button>
                </Link>
            </div>

        </div>
    );
}

export default SearchBar;