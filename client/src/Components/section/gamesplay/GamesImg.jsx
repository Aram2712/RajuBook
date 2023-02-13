import React from 'react';
import cricket from "./images/cricet.jpg"
import football from "./images/football2.jpg"
import tennis from "./images/Tenis.jpg"
import casino from "./images/casino.jpg"
import patti from "./images/Patti.jpg"
import styles from "./gamesPlay.module.css"

function GamesImg() {


    const playCasino = [
        {
            id: 1,
            img: cricket,
            title: "Cricket"
        }, {
            id: 2,

            img: football,
            title: "Football"
        }, {
            id: 3,

            img: tennis,
            title: "Tennis"
        }, {
            id: 4,
            img: casino,
            title: "Casino"
        }, {
            id:5,
            img: patti,
            title: "Teen Patti"
        }
    ]

    return (
        <div className={styles.gamesPlayBlock}>

            {playCasino.map((item) =>
                <div className={styles.gamesPlayItem} key={item.id}>
                    <img src={item.img} alt={"title"} className={styles.gamesImg}/>
                    <h3 className={styles.gamesPlayTitle}>{item.title}</h3>
                </div>
            )}

        </div>
    );
}

export default GamesImg;