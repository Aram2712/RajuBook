import React, {useState} from 'react';
import styles from "./getId.module.css"
import { useGlobalContext } from '../../../context';

function GetId() {
    const user = localStorage.getItem("user")

    const openRegistrForm = () => {
    
        if(user){
            setIsRegisterModalOpen(false)
        }
        else{
            setIsRegisterModalOpen(true)
        }
    }
const {setIsRegisterModalOpen} = useGlobalContext()
    return (
        <div className={styles.getIdContainer}>
            <div className={"container"}>
                <div className={styles.getIdBlock}>
                    <h3 className={styles.getIdTitle}>GET YOUR ID TODAY</h3>
                    {user ? "" : <button className={styles.clickGetId} onClick={openRegistrForm}>Click to get id</button>}
                </div>
            </div>

        </div>
    );
}

export default GetId;
