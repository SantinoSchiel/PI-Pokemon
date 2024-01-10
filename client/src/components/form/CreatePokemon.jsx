import React, { useState } from "react";
import style from "./CreatePokemon.module.css";
import { Link } from "react-router-dom";

export default function Form(props) {
    const [userData, setUserData] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={style.form}>
            <Link to="/home" className={style.goBackButton}>
                Go Back
            </Link>
            <form onSubmit={handleSubmit}>
                <label><strong>Name: </strong></label>
                <input
                    value={userData.name}
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name..."
                />
                <p><strong></strong></p>

                <label><strong>Image: </strong></label>
                <input
                    value={userData.image}
                    onChange={handleChange}
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Image URL..."
                />
                <p><strong></strong></p>

                <label><strong>Hp: </strong></label>
                <input
                    value={userData.hp}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Attack: </strong></label>
                <input
                    value={userData.attack}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Defense: </strong></label>
                <input
                    value={userData.defense}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Speed: </strong></label>
                <input
                    value={userData.speed}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Height: </strong></label>
                <input
                    value={userData.height}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Weight: </strong></label>
                <input
                    value={userData.weight}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>
                <label><strong>Types: </strong></label>
                <input
                    value={userData.types}
                    onChange={handleChange}
                    type="number"
                    id="hp"
                    name="hp"
                    placeholder="Hp..."
                />
                <p><strong></strong></p>

                <button type="submit"><strong>Create Pokemon</strong></button>
            </form>
        </div>
    );
}