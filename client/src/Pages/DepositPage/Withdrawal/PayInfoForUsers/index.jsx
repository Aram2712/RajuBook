import React from 'react'
import Card from './Card';
import styles from './payInfoForUsers.module.css';

const PayInfoForUsers = (props) => {
    return (
        <div className={styles.mainPayInfoBlock}>
              {props.payInfo ? <Card bankAccountInfo={props.payInfo} depoType = {props.depoType}/> : <p className={styles.noInfoText}>No information yet(</p>}
        </div>
    )
}

export default PayInfoForUsers