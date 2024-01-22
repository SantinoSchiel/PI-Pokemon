import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from './Detail.module.css';

export default function Detail() {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${id}`).then(
            ({ data }) => {
                setPokemon(data);
            }
        );
        return setPokemon({});
    }, [id]);

    return (
        <div className={style.cardContainer}>

            <Link to="/home" className={style.goBackButton}>
                Go Home
            </Link>

            <div className={style.card}>

                <div className={style.info}>
                    <div className={style.imageContainer}>
                        <img src={pokemon.image} alt={pokemon.name} className={style.image} />
                    </div>
                    <h2 className={style.name}>{pokemon.name}</h2>
                    <p>Hp: {pokemon.stats && pokemon.stats.hp || pokemon.hp}</p>
                    <p>Attack: {pokemon.stats && pokemon.stats.attack || pokemon.attack}</p>
                    <p>Defense: {pokemon.stats && pokemon.stats.defense || pokemon.defense}</p>
                    <p>Speed: {pokemon.stats && pokemon.stats.speed || pokemon.speed}</p>
                    <p>ID: {pokemon.id}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Types: {pokemon.types && pokemon.types.join(', ')}</p>
                </div>

            </div>
        </div>
    );
}
