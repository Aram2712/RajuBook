import React from 'react';
import styles from "./footer.module.css"

function FooterInfo() {
    return (
        <div>
            <p className={styles.infoFor}>+919916987654, +15304470270</p>
            <p className={styles.supPort}>24/7 SUPPORT</p>
            <p className={styles.footerLinkWhatsapp}>
                 +919916987654 +15304470270
            </p>
        </div>
    );
}

export default FooterInfo;
