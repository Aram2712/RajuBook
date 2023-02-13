import React from 'react';
import lucky from "./images/lucky-roller.png"
import whatsappIcon from "./images/whatsapp.svg";
import styles from "./friendlyBook.module.css";

function FriendlyBookList() {
    return (
        <div className={styles.friendlyBookContainer}>
            <div>
                <img src={lucky} alt={"lucky"} className={styles.locky}/>
            </div>

            <div className={styles.friendlyBookBlock}>
                <h3 className={styles.friendlyBookTitle}>THE PUNTER FRIENDLY BOOK</h3>
                <p className={styles.infoFriendlyBook}>We Deal With All Branded Sites And Present The Fastest
                    Withdrawal Service.</p>
                <a href={"https://wa.me/919916987654"} className={styles.friendlyBookBlockLink}>
                    <img src={whatsappIcon} alt={"whatsapp"}/>
                    <span>+919916987654</span>
                </a>
                <p className={styles.whatsappInfo}>WE DEAL ONLY ON WHATSAPP</p>
            </div>


        </div>
    );
}

export default FriendlyBookList;
