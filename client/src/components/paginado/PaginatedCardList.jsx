import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import style from './PaginatedCardList.module.css';

const PaginatedCardList = ({pokemons}) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(pokemons.length / itemsPerPage);

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    // const loadMorePokemons = async () => {
    //     if (loading) return;

    //     try {
    //         setLoading(true);
    //         const response = await axios.get(`http://localhost:3001/pokemons?page=${currentPage}`);
    //         setPokemons(prevPokemons => [...prevPokemons, ...response.data]);
    //         setPreloadedPage(prevPage => prevPage + 1);
    //     } catch (error) {
    //         console.error('Error fetching more Pokémon:', error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Cargar los primeros Pokémon cuando el componente se monta
    // useEffect(() => {
    //     loadMorePokemons();
    // }, []);

    // const handleClick = () => {
    //     loadMorePokemons();
    // };

    // const handleBothClicks = () => {
    //     handleNextClick();
    //     handleClick();
    // };

    return (
        <div className={style.cardContainer}>
            <div className={style.cardList}>
                {currentItems.map(pokemon => (
                    <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                ))}
            </div>
            <div className={style.pagination}>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>{`Página ${currentPage} de ${totalPages}`}</span>
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default PaginatedCardList;
