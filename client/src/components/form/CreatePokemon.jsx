import React, { useEffect, useState } from "react";
import style from "./CreatePokemon.module.css";
import { Link } from "react-router-dom";
import { createPokemon } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import Validation from "../utilities/Validation";
import Card from "../card/Card";

export default function Form({ pokemons }) {

    const dispatch = useDispatch();

    const [error, setErrors] = useState({});
    const [randomImageUrl, setRandomImageUrl] = useState("");
    const [typesOptions, setTypesOptions] = useState([]);
    const [lastCreatedPokemon, setLastCreatedPokemon] = useState(null);

    const [userData, setUserData] = useState({
        name: "",
        image: "",
        randomImage: false,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: "",
    });

    useEffect(() => {
        if (userData.randomImage && pokemons.length > 0) {
            const randomIndex = Math.floor(Math.random() * pokemons.length);
            setRandomImageUrl(pokemons[randomIndex].image);
            userData.image = pokemons[randomIndex].image;
        } else {
            setRandomImageUrl("");
        }
    }, [userData.randomImage]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setUserData((prevData) => {
            let updatedData;

            if (name === "types") {
                const typesArray = value.split(',').map(type => type.trim());
                updatedData = {
                    ...prevData,
                    [name]: typesArray,
                };
            } else if (type === "checkbox") {
                const randomUrl = pokemons.map((pokemon) => pokemon.image);
                const randomIndex = Math.floor(Math.random() * randomUrl.length);
                const randomImageUrl = randomUrl[randomIndex];

                updatedData = {
                    ...prevData,
                    [name]: checked,
                    image: "",
                };
            } else {
                updatedData = {
                    ...prevData,
                    [name]: value,
                };
            }

            return updatedData;
        });
    };

    useEffect(() => {
        setErrors(Validation(userData));
    }, [userData]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = Validation(userData);
        setErrors(validationErrors);
        // console.log('userData', userData)

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3001/pokemons", userData);
                const newPokemon = response.data;
                dispatch(createPokemon(newPokemon));
                setLastCreatedPokemon(newPokemon);
            } catch (error) {
                console.error("Error al crear el Pokémon:", error.message);
            }
        }

        setUserData({
            name: "",
            image: "",
            randomImage: false,
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: "",
        })
    };


    const handleNumberButtonClick = (fieldName, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const numberButtons = [0, 25, 50, 100, 125, 150, 175, 200, 225, 255];

    const toggleType = (selectedType) => {
        const validationErrors = Validation(userData);
        setErrors(validationErrors);


        setUserData((prevData) => {
            const updatedTypes = prevData.types.includes(selectedType)
                ? prevData.types.filter(type => type !== selectedType)
                : [...prevData.types, selectedType];

            return {
                ...prevData,
                types: updatedTypes,
            };
        });
        // console.log(userData.types)
        console.log('userData', userData)
    };

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/types');
                const arrayTypes = data.map(names => names.name)
                setTypesOptions(arrayTypes);
                // console.log(typesOptions)
            } catch (error) {
                console.error('Error fetching types:', error.message);
            }
        };

        fetchTypes();
    }, []);

    return (
        <div className={style.form}>
            <Link to="/home" className={style.goBackButton}>
                Go Back
            </Link>

            <div className={style.cardList}>
                {lastCreatedPokemon ? (
                    <Card
                        key={lastCreatedPokemon.id}
                        id={lastCreatedPokemon.id}
                        name={lastCreatedPokemon.name}
                        image={lastCreatedPokemon.image}
                        types={lastCreatedPokemon.types}
                    />
                ) : (
                    <p>Your card will appear here!</p>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className={style.formSection}>
                    <label>
                        <strong>Name: </strong>
                        <input
                            value={userData.name}
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name..."
                        />
                    </label>
                    <label>
                        <strong>Image: </strong>
                        <div className={style.imageOptions}>
                            <label className={style.containCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={userData.randomImage}
                                    onChange={handleChange}
                                    name="randomImage"
                                    className={style.checkbox}
                                />
                                Use Random Image
                                <div className={style.checkmark}></div>
                            </label>
                        </div>
                        {!userData.randomImage ? (
                            <>
                                <input
                                    type="text"
                                    value={userData.image}
                                    onChange={handleChange}
                                    id="image"
                                    name="image"
                                    placeholder="Image URL..."
                                />
                            </>
                        ) : (
                            <div className={style.randomImage}>
                                <img
                                    src={randomImageUrl}
                                    alt="Random Pokemon"
                                    className={style.randomImage}
                                />
                            </div>
                        )}
                    </label>
                </div>


                <div className={style.formSection}>
                    <label>
                        <strong>Hp: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.hp}
                            onChange={handleChange}
                            type="number"
                            id="hp"
                            name="hp"
                            placeholder="Hp..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("hp", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label>
                        <strong>Attack: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.attack}
                            onChange={handleChange}
                            type="number"
                            id="attack"
                            name="attack"
                            placeholder="Attack..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("attack", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>


                    <label>
                        <strong>Defense: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.defense}
                            onChange={handleChange}
                            type="number"
                            id="defense"
                            name="defense"
                            placeholder="Defense..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("defense", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label>
                        <strong>Speed: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.speed}
                            onChange={handleChange}
                            type="number"
                            id="speed"
                            name="speed"
                            placeholder="Speed..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("speed", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </form>




            <form onSubmit={handleSubmit}>
                <div className={style.formSection}>
                    <label>
                        <strong>Height: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.height}
                            onChange={handleChange}
                            type="number"
                            id="height"
                            name="height"
                            placeholder="Height..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("height", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label>
                        <strong>Weight: </strong>
                    </label>
                    <div>
                        <input
                            value={userData.weight}
                            onChange={handleChange}
                            type="number"
                            id="weight"
                            name="weight"
                            placeholder="Weight..."
                        />
                        <div className={style.numberButtons}>
                            {numberButtons.map((buttonValue) => (
                                <button
                                    key={buttonValue}
                                    type="button"
                                    onClick={() => handleNumberButtonClick("weight", buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label><strong>Types: </strong></label>
                    <div>
                        {typesOptions.map((type, index) => (
                            <button
                                key={index}
                                type="button"
                                value={type.toLowerCase()}
                                className={`${userData.types.includes(type) ? style.checked : ''}`}
                                onClick={() => toggleType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={style.errors}>
                    <strong>Requirements</strong>
                    <span>Name: </span><p>{error.name ? error.name : 'all good!'}</p>
                    <span>Image: </span><p>{error.image ? error.image : 'all good!'}</p>
                    <span>Hp: </span><p>{error.hp ? error.hp : 'all good!'}</p>
                    <span>Attack: </span><p>{error.attack ? error.attack : 'all good!'}</p>
                    <span>Defense: </span><p>{error.defense ? error.defense : 'all good!'}</p>
                    <span>Speed: </span><p>{error.speed ? error.speed : 'all good!'}</p>
                    <span>Height: </span><p>{error.height ? error.height : 'all good!'}</p>
                    <span>Weight: </span><p>{error.weight ? error.weight : 'all good!'}</p>
                    <span>Types: </span><p>{error.types ? error.types : 'all good!'}</p>
                    <div className={style.formSection}>
                        <button
                            type="submit"
                            disabled={Object.values(error).some((err) => err)}
                            className={`${style.button} ${Object.values(error).some((err) => err) ? '' : style.enabled}`}
                        >
                            <p>Create Pokemon</p>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}