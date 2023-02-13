import React from 'react';
import kingDom from "../../../Images/logo.svg"
import styles from "./customerSupport.module.css"
function KingDomBook() {
    return (
        <div className={styles.kingDomSize}>
            <img src={kingDom} alt={"kingDomImg"} className={styles.kingDom}/>
            <h2 className={styles.kingDomTitle}>24 hours service</h2>
        </div>
    );
}

export default KingDomBook;
