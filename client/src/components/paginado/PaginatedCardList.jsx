import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import style from './PaginatedCardList.module.css';

const PaginatedCardList = ({ pokemons, dataFromSearchBar, onGoBack }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    let currentItems = [];

    if (dataFromSearchBar.length > 0) {
        currentItems = dataFromSearchBar;
    } else {
        currentItems = pokemons;
    }

    const totalPages = Math.ceil(currentItems.length / itemsPerPage);
    const maxButtonsToShow = 4;
    const halfMaxButtonsToShow = Math.floor(maxButtonsToShow / 2);

    const renderPageButtons = () => {
        const buttons = [];
        let startPage = Math.max(1, currentPage - halfMaxButtonsToShow);
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

        if (totalPages <= maxButtonsToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= halfMaxButtonsToShow) {
            endPage = maxButtonsToShow;
        } else if (currentPage >= totalPages - halfMaxButtonsToShow) {
            startPage = totalPages - maxButtonsToShow + 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? `${style.pageButton} ${style.currentPage}` : style.pageButton}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const visibleItems = currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={style.cardContainer}>
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

            {totalPages > 1 && (
                <div className={style.pagination}>
                    <button onClick={handlePrevClick} disabled={currentPage === 1}>
                        Prev
                    </button>
                    {renderPageButtons()}
                    <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaginatedCardList;
