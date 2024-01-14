import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from './Detail.module.css';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${id}`).then(
            ({ data }) => {
                if (data.name) {
                    setPokemons(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                    navigate(-1);
                }
            }
        );
        return setPokemons({});
    }, [id, navigate]);

    return (
        <div className={style.cardContainer}>

            <Link to="/home" className={style.goBackButton}>
                Go Back
            </Link>

            <div className={style.card}>

                <div className={style.info}>
                    <div className={style.imageContainer}>
                        <img src={pokemons.image} alt={pokemons.name} className={style.image} />
                    </div>
                    <h2 className={style.name}>{pokemons.name}</h2>
                    <p>Hp: {pokemons.stats && pokemons.stats.hp || pokemons.hp}</p>
                    <p>Attack: {pokemons.stats && pokemons.stats.attack || pokemons.attack}</p>
                    <p>Defense: {pokemons.stats && pokemons.stats.defense || pokemons.defense}</p>
                    <p>Speed: {pokemons.stats && pokemons.stats.speed || pokemons.speed}</p>
                    <p>ID: {pokemons.id}</p>
                    <p>Height: {pokemons.height}</p>
                    <p>Weight: {pokemons.weight}</p>
                    <p>Types: {pokemons.types && pokemons.types.join(', ')}</p>
                </div>

            </div>
        </div>
    );
}
