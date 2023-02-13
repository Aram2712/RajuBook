import React from 'react';
import GamesImg from "./GamesImg";
import GamesPlayInfo from "./GamesPlayInfo";
import styles from "./gamesPlay.module.css"

function GamesPlay() {
    return (
        <div className={styles.gamesPlay}>
           <div className={styles.gamesPlayContainer}>
               <GamesImg/>
               <GamesPlayInfo/>
           </div>
        </div>
    );
}

export default GamesPlay;