import React from 'react'
import Card from './Card';
import styles from './payInfo.module.css';
import { useSelector } from 'react-redux';
const PayInfo = (props) => {

    return (
        <div className={styles.mainPayInfoBlock}>
            {props.payInfo ? <Card bankAccountInfo={props.payInfo} /> : <p className={styles.noInfoText}>No information yet</p>}
        </div>
    )
}

export default PayInfo

