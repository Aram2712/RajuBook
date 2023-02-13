import React from 'react';
import styles from "./footer.module.css"
import FooterLink from "./footerLink";
import FooterInfo from "./footerInfo";
import FooterDepositInfo from "./footerDepositInfo";
function FooterBlock() {
    return (
        <div>
            <h3 className={styles.footerTitle}>Get In Touch With Rajubooks.co Customer Care</h3>
            <p className={styles.footerInfo}>RAJUBOOK IS THE MOST TRUSTED AND THE BIGGEST BOOK IN INDIA SINCE 2017</p>
            <FooterLink/>
            <FooterInfo/>
            <FooterDepositInfo/>
        </div>
    );
}

export default FooterBlock;
