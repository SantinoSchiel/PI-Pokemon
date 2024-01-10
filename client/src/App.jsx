import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage.jsx';
import HomePage from './components/homePage/homePage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { allPokemons } from './redux/actions.js';
import Detail from './components/detail/Detail.jsx';
import CreatePokemon from './components/form/CreatePokemon.jsx'

function App() {
  const { pokemons } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const Pokemons = async () => {
      const URL = "http://localhost:3001/pokemons";
      try {
        const { data } = await axios.get(URL);

        if (data) {
          dispatch(allPokemons(data));
        }

      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
      }
    };
    Pokemons();
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage pokemons={pokemons}/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/createPokemon' element={<CreatePokemon/>} />
      </Routes>
    </div>
  );
}

export default App;
