import React from 'react';
import styles from "./footer.module.css"

function FooterLink() {
    return (
        <div className={styles.footerLink}>

            <a href={"https://wa.me/919916987654"} target = "blank" className={styles.link} title={"Whatsapp"}>
                <i className={`${styles.whatsapp} fa-brands fa-whatsapp`}></i>
            </a>

            <a href={"https://www.instagram.com/raju__enterprises/?igshid=YmMyMTA2M2Y%3D"} target = "blank" className={styles.link} title={"Instagram"}>
                <i className={`${styles.instagram} fa-brands fa-instagram`}></i>
            </a>

            <a href={"https://www.facebook.com/people/Raju-Book/100086551656303/"} className={styles.link} target = "blank" title={"Facebook"}>
                <i className={`${styles.facebook} fa-brands fa-facebook-f`}></i>
            </a>

            <a href={"https://t.me/+919916987654"} target = "blank" className={styles.link} title={"Telegram"}>
                <i className={`${styles.telegram} fa-brands fa-telegram `}></i>
            </a>

        </div>
    );
}

export default FooterLink;
