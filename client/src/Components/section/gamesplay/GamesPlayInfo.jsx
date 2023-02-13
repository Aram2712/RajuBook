import React from 'react';
import styles from "./gamesPlay.module.css"
import {ButtonLink} from "../../button";

function GamesPlayInfo() {
    return (
        <div className={styles.gamesPlayInfoContainer}>
            <h3 className={styles.gamesPlayInfoTitle}>How to play
            </h3>
            <span className={styles.gamesPlayInfoTitleTwo}>on our Platform</span>

            <p className={styles.gamesPlayInfoText}>
                With Our Step By Step Guide For Beginners, Get Started Playing. Start Learning Now. 24/7 ACTIVE.
            </p>

            <hr/>

            <h5 className={styles.gamesPlayInfoWhatsApp}>We Deal Only On WhatsApp</h5>
            <ButtonLink width={348} height={75}  href={"https://wa.me/919916987654"} className={styles.gamesPlayInfoBtn} fontSize={30} content={"+919916987654"}/>
        </div>
    );
}

export default GamesPlayInfo;
