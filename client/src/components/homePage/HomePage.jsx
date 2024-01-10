import React, { useState } from 'react';
import style from './home.module.css'
import SearchBar from '../searchBar/SearchBar';
import PaginatedCardList from '../paginado/PaginatedCardList';

function HomePage({ pokemons }) {
  const [dataFromSearchBar, setDataFromSearchBar] = useState([]);

  const handleDataFromSearchBar = (data) => {
    setDataFromSearchBar(data);
  };

  const handleGoBack = () => {
    setDataFromSearchBar([]);
  };

  return (
    <div className={style.container}>
      <SearchBar pokemons={pokemons} onDataFromSearchBar={handleDataFromSearchBar} />
      <PaginatedCardList pokemons={pokemons} dataFromSearchBar={dataFromSearchBar} onGoBack={handleGoBack} />
    </div>
  );
}

export default HomePage;