import React from 'react';
import styles from './PageError404.module.css';
import error404 from './error-404.jpg';

function PageError404() {
  return (
    <div>
        <img className = {styles.img404} src ={error404} alt = {'404'}/>
    </div>
  )
}

export default PageError404
