import React from 'react';
import ClientsCarousel from "./ClientsCarousel";
import styles from "./clientsCard.module.css"

function ClientsCard() {
    return (
        <div className={styles.clientsCard}>
            <div className={"container"}>
                <ClientsCarousel/>
            </div>
        </div>
    );
}

export default ClientsCard;
