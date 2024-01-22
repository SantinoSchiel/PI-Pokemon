import React from 'react';
import style from './landing.module.css'
import {NavLink} from 'react-router-dom'

function LandingPage() {
    return (
      <div className={style.container}>
        <NavLink to={'/home'} >
        <button className={style.button}>Join!</button>
        </NavLink>
      </div>
    );
  }
  
  export default LandingPage;