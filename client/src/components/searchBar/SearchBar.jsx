import React, { useEffect, useState } from 'react';
import style from './Search.module.css';
import { useDispatch } from "react-redux";
import { filterType, filterApiOrDb, orderAlphabetically, orderAttack } from '../../redux/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchBar({ pokemons, onDataFromSearchBar }) {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [typesOptions, setTypesOptions] = useState([]);
    const [selectedApiOrDb, setSelectedApiOrDb] = useState(localStorage.getItem('selectedApiOrDb') || 'All');
    const [selectedType, setSelectedType] = useState(localStorage.getItem('selectedType') || 'All');
    const [selectedOrder, setSelectedOrder] = useState(localStorage.getItem('selectedOrder') || 'DefaultAlphabetical');
    const [selectedOrderAttack, setSelectedOrderAttack] = useState(localStorage.getItem('selectedOrderAttack') || 'DefaultAttack');

    const onSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    useEffect(() => {
        const results = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, pokemons]);

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

    const handleOrderAlphabetical = event => {
        const selectedValue = event.target.value;
        dispatch(orderAlphabetically(selectedValue))
        
        setSelectedOrder(selectedValue);
        localStorage.setItem('selectedOrder', selectedValue);
    }

    const handleOrderAttack = event => {
        const selectedValue = event.target.value;
        dispatch(orderAttack(selectedValue));

        setSelectedOrderAttack(selectedValue);
        localStorage.setItem('selectedOrderAttack', selectedValue);
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
            <div className={style.filterContainer}>
                <div className={style.select}>
                    <strong>Alphabetically:</strong>
                    <select name="orderAlphabetical" onChange={handleOrderAlphabetical} value={selectedOrder}>
                        <option value="DefaultAlphabetical"> Default </option>
                        <option value="GrowingAlphabetical"> Growing </option>
                        <option value="DecreasingAlphabetical"> Decreasing </option>
                    </select>

                    <strong>Attack:</strong>
                    <select name="orderAttack" onChange={handleOrderAttack} value={selectedOrderAttack}>
                        <option value="DefaultAttack"> Default </option>
                        <option value="GrowingAttack"> Growing </option>
                        <option value="DecreasingAttack"> Decreasing </option>
                    </select>

                    <strong>Api/Db:</strong>
                    <select name="filterApiOrDb" onChange={handleFilterDbOrApi} value={selectedApiOrDb} >
                        <option value="All"> All </option>
                        <option value="API"> API </option>
                        <option value="DB"> DB </option>
                    </select>

                    <strong>Types:</strong>
                    <select name="filterType" onChange={handleFilter} value={selectedType} >
                        <option value="All"> All </option>
                        {typesOptions.map((type, index) => (
                            <option key={index} value={type.name.toLowerCase()}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <input value={searchTerm} type='search' placeholder="name..." onChange={onSearch} />

            <div>
                <Link to="/createPokemon">
                    <button>Create pokemon</button>
                </Link>
            </div>
        </div>
    );
}

export default SearchBar;
