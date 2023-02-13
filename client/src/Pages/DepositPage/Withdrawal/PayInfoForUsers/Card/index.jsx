import React from 'react';

import styles from './card.module.css'

const Card = (props) => {
    console.log(props)

    return (
            <>
                {props.depoType.map(item=>
                    item.bankInfo== "bank" ?

                        <div key = {item.id} className={styles.mainCardBlock}>
                            <p>Acc.No. : <span>{item.accountNo}</span></p>
                            <p>IFSC : <span>{item.ifscCode}</span></p>
                            <p>Holder Name : <span>{item.holderName}</span></p>
                        </div>

                        :
                        <div key = {item.id} className={styles.mainCardBlock}>
                            <p>Phone No. : <span>{item.phoneNo}</span></p>
                            <p>UPI ID : <span>{item.upiId}</span></p>
                            <p>Holder Name : <span>{item.holderName}</span></p>
                        </div>

                    )

                }
            </>
    )
}

export default Card