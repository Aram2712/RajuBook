import React from 'react';
import FriendlyBookList from "./FriendlyBookList";
import styles from "./friendlyBook.module.css"

function FriendlyBook() {
    return (
        <div className={styles.friendlyBook}>
            <div className={"container"}>
                <FriendlyBookList/>
            </div>
        </div>
    );
}

export default FriendlyBook;
