import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import style from './PaginatedCardList.module.css';

const PaginatedCardList = ({ pokemons, dataFromSearchBar, onGoBack }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    let currentItems = [];

    if (dataFromSearchBar.length > 0) {
        currentItems = dataFromSearchBar;
    } else {
        currentItems = pokemons;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const visibleItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentItems.length / itemsPerPage);

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const totalPagesToShow = currentItems === dataFromSearchBar ? 1 : totalPages;

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const goPageOne = () => {
        setCurrentPage(1);
    }

    return (
        <div className={style.cardContainer}>
            {currentItems === dataFromSearchBar && (
                <button className={style.buttonGoBack} onClick={onGoBack}>
                    Reset
                </button>
            )}
            <div className={style.cardList}>
                {visibleItems.map(pokemon => (
                    <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                ))}
            </div>
            {totalPagesToShow > 1 && (
                <div className={style.pagination}>
                    <button onClick={goPageOne}>
                        Page 1
                    </button>
                    <button onClick={handlePrevClick} disabled={currentPage === 1}>
                        Back
                    </button>
                    <span>{`Page ${currentPage} of ${totalPagesToShow}`}</span>
                    <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default PaginatedCardList;
