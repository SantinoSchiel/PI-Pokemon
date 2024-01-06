import React from 'react';
import style from './home.module.css'
import SearchBar from '../searchBar/SearchBar';
import PaginatedCardList from '../paginado/PaginatedCardList';

function HomePage(props) {
    return (
      <div className={style.container}>
        <SearchBar/>
        <PaginatedCardList pokemons={props.pokemons}/>
      </div>
    );
  }
  
  export default HomePage;