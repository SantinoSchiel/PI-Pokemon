import { Link } from 'react-router-dom';
import style from './Card.module.css';
import React from "react";

export default function Card(props) {
    // console.log('esto es props en Card', props)

    return (
        <div className={style.conteiner}>
            <Link to={`/detail/${props.id}`} className={style.link}>

                <img className={style.imagen} src={props.image} alt='' />

                <h2>{props.name}</h2>

                <p className={style.subtitle}>Types:</p>
                <ul className={style.typesList}>
                    {props.types.map((type, index) => (
                        <li key={index}>{type}</li>
                    ))}
                </ul>

            </Link>
        </div>
    );
}