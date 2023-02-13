import React, {useState} from 'react';
import {ButtonLink} from "../../button/index";
import styles from "./customerSupport.module.css"
import KingDomBook from "./KingDomBook";

function CustomerSupportBlock() {
    return (
        <div className={styles.customerSupportBlockContainer}>
            <div className={styles.customerSupportBlockItem}>
                <h3 className={styles.customerTitle}>Customer Support</h3>
                <p className={styles.customerInfo}>Get In Touch With RajuBook BOOK CUSTOMER CARE For Any Quieries,
                    Emergencies, Feedbacks or Complaints.
                    We Are Here To Help You 24/7 With Our Online Services.</p>
                <hr className={styles.border}/>
                <h5 className={styles.customerWhatsApp}>Customer Care No. For WhatsApp & Calling</h5>
                <ButtonLink href={"https://wa.me/919916987654"} target = "blank" width={235} height={60} content={"+919916987654"}/>
            </div>
            <KingDomBook/>
        </div>


);
}

export default CustomerSupportBlock;
