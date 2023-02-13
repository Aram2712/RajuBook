import React from 'react';
import styles from "./footer.module.css"
import FooterBlock from "./footerBlock";

function Footer() {
    return (
        <div className={`${styles.footer} `}>
            <div className={"container"}>
                <FooterBlock/>
            </div>
        </div>
    );
}

export default Footer;
