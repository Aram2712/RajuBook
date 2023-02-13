import React from 'react';

import styles from './card.module.css';
import gpay from './QR_Codes/gpay.jfif';
import paytm from './QR_Codes/paytm.jfif';
import phonePay from './QR_Codes/phonePay.jfif';
import * as constants from "../../../../constants.js";

const Card = (props) => {
    console.log(props)
    return (
        <div className={styles.mainCardBlock}>
            {
                props.bankAccountInfo.title == "Bank Accounts" ?
                    (
                        <div className={styles.card_info}>
                            <div className={styles.text_data_box} id={styles.card_info}>
                                <p>Acc.No. : <span>{props.bankAccountInfo.acc_no}</span></p>
                                <p>IFSC : <span>{props.bankAccountInfo.ifsc}</span></p>
                                <p>Holder Name : <span>{props.bankAccountInfo.holder_name}</span></p>
                                <p>Min Deposit : <span>{props.bankAccountInfo.min_dep}</span></p>
                                <p>Max Deposit : <span>{props.bankAccountInfo.max_dep}</span></p>
                            </div>
                            <div className={styles.qr_image_box}>
                                <img src={`${constants.baseURL + props.bankAccountInfo.qrPath.slice(6)}`} className={styles.qr_image}/>
                            </div>
                        </div>
                    )
                    :

                        (
                            <div className={styles.card_info}>
                                <div className={styles.text_data_box}>
                                    <p>Phone No. : <span>{props.bankAccountInfo.phone_no}</span></p>
                                    <p>UPI ID : <span>{props.bankAccountInfo.upi_id}</span></p>
                                    <p>Holder Name : <span>{props.bankAccountInfo.holder_name}</span></p>
                                    <p>Min Deposit : <span>{props.bankAccountInfo.min_dep}</span></p>
                                    <p>Max Deposit : <span>{props.bankAccountInfo.max_dep}</span></p>
                                </div>
                                <div className={styles.qr_image_box}>
                                    <img src={`${constants.baseURL + props.bankAccountInfo.qrPath.slice(6)}`} className={styles.qr_image}/>
                                </div>
                            </div>

                        )

            }

        </div>
    )
}

export default Card