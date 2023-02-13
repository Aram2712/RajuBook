import React from 'react';
import styles from "./casinoGames.module.css";
import List from "./List";

function CasinoGames() {
    return (
        <div className={styles.casinoGames}>
            <div className={"container"}>
                <h2 className={styles.casinoTitle}>AVAILABLE SITES ON OUR PLATFORM</h2>
                <p className={styles.casinoInfo}>WE HAVE MULTIPLE SITES ON OUR PLATFORM FOR OUR CLIENTS.</p>
                <List/>
                <p className={styles.casinoInfo}>WITH 24 X 7 WITHDRAWAL & DEPOSIT FACILITIES.</p>
            </div>
        </div>
    );
}

export default CasinoGames;
