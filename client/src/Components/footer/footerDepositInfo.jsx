import React from 'react';
import logoFooter from "./images/logo.svg";
import upl from "./images/1648970219.png"
import payTm from "./images/1648969876.png"
import phonePh from "./images/1648970075.png"
import googlePlay from "./images/1648969756.png";
import styles from "./footer.module.css";

function FooterDepositInfo() {
    return (
        <div className={styles.footerDepositInfo}>
            <img src={logoFooter} alt={"logoFooter"} className={styles.logoFooter}/>

           <div>
               <div className={styles.depositInfoImgSize}>
                   <a href = "https://www.npci.org.in/what-we-do/upi/product-overview" target = "blank"><img src={upl} alt={"upl"} className={styles.depositInfoImg} /></a>
                   <a href = "https://play.google.com/store/apps/details?id=com.phonepe.app&hl=en&gl=US" target = "blank"><img src={phonePh} alt={"phonePh"} className={styles.depositInfoImg} /></a>
                   <a href = "https://pay.google.com/about/" target = "blank"><img src={googlePlay} alt={"googlePlay"}  className={styles.depositInfoImg}/></a>
                   <a href = "https://paytm.com/" target = "blank"><img src={payTm} alt={"payTm"} className={styles.depositInfoImg} /></a>
               </div>
               <p className={styles.footerInfoText}>We Accept All Types Of Payments</p>
           </div>
        </div>
    );
}

export default FooterDepositInfo;
