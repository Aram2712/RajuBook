import React, { useEffect,useState } from "react";
import './firstDepositWindow.css';
import {useGlobalContext} from '../../../context';
import ReactModal from 'react-modal';
import bonus from '../../../Images/bonus.gif';
import * as constants from '../../../constants';

function FirstDepositWindow() {
    
    const [openWindow, setOpenWindow] = useState(false);
    const [depositData, setDepositData] = useState([]);
    const id =localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).id : null;

    useEffect(()=>{
        if(id) {
            setTimeout(() => {
                fetch(`${constants.baseURL}/find_transfer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id})
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result[0].length == 0) {
                            setOpenWindow(true)
                        }
                        else{
                            setOpenWindow(false)
                        }
                    })
                    .catch(err => console.log(err))
            }, 2000)
        }
    },[])
    
    const closeWindow = () => {
        setOpenWindow(false)
    }

    return(
       
            <ReactModal
                isOpen={openWindow}
                onRequestClose={closeWindow}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 95,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10
                    },
                    content: {
                        // position: 'relative',
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        maxWidth: '400px',
                        maxHeight:"400px",
                        margin: '5% auto',
                        border: '1px solid #000F26',
                        background: "#000F26",
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        overflowY:"auto",
                        outline: 'none',
                        padding: '20px',
                        inset: '0'
                    }
                }}
                >
                <button className='closeBtn' onClick={closeWindow}><i className="fa-solid fa-xmark" style = {{fontSize:'25px'}}></i></button>
                <img src = {bonus} className="bonus_image"/>
                <h2 className="first_deposit_window_head">
                    BONUS 5%
                </h2>
                <p className="first_deposit_window_text">
                    5% bonus for the first deposit.
                </p>
            </ReactModal>
  
    )
}

export default FirstDepositWindow