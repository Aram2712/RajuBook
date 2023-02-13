import React from 'react';
import styles from "./customerSupport.module.css"
import CustomerSupportBlock from "./CustomerSupportBlock";

function CustomerSupport() {
    return (
        <div className={styles.customerSupport}>
            <div className={"container"}>
                <CustomerSupportBlock/>
            </div>

        </div>
    );
}

export default CustomerSupport;
