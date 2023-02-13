import {useEffect, useState} from 'react';
import DepositAndWithdrawalPage from './Deposit&Withdrawal/index.jsx';
import FundTransfer from './FundTransfer/FundTransfer.jsx';
import GetID from './GetID/GetID';
import MyID from './MyID/MyID.jsx';
import styles from './depositPage.module.css';
import {getAllAccounts} from "../../actions/getAllAccounts";
import { useDispatch } from 'react-redux';


const DepositPage = () => {
    const [showGetID, setShowGetID] = useState(false);
    const [showMyID, setShowMyID] = useState(false);
    const [showFundTransfer, setShowFundTransfer] = useState(false);
    const [showDepositAndWithdrawal, setShowDepositAndWithdrawal] = useState(true);
    const [userId, setUserId] = useState({id:JSON.parse(localStorage.getItem("user")).id})

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAccounts(userId))
    }, [])
    const showOnlyGetID = () => {
        setShowGetID(true);
        setShowMyID(false);
        setShowFundTransfer(false)
        setShowDepositAndWithdrawal(false)
    }

    const showOnlyMyID = () => {
        setShowMyID(true);
        setShowGetID(false);
        setShowFundTransfer(false);
        setShowDepositAndWithdrawal(false);
    }

    const showOnlyFundTransfer = () => {
        setShowFundTransfer(true);
        setShowGetID(false);
        setShowDepositAndWithdrawal(false);
        setShowMyID(false);
    }

    const showOnlyshowDepositAndWithdrawal = () => {
        setShowDepositAndWithdrawal(true);
        setShowGetID(false);
        setShowFundTransfer(false);
        setShowMyID(false);
    }


    return (
        <div className={styles.mainDepositPage}>
            <div className="container">
                <div className={styles.btnControl}>
                    <button className={showGetID ? styles.active : ''} onClick={showOnlyGetID}>Get ID</button>
                    <button className={showMyID ? styles.active : ''} onClick={showOnlyMyID}>My ID</button>
                    <button className={showFundTransfer ? styles.active : ''} onClick={showOnlyFundTransfer}>Fund Transfer</button>
                    <button className={showDepositAndWithdrawal ? styles.active : ''} onClick={showOnlyshowDepositAndWithdrawal}>Deposit/Withdrawal</button>
                </div>
                <div className={styles.note_box}>
                    <p> <strong>Note!</strong>  PLEASE EACH TIME CHECK ACCOUNT DETAILS BEFORE DEPOSIT.
                     DON'T DEPOSIT ON OLD ACCOUNTS. ACCOUNT DETAILS CAN CHANGE ANYTIME.
                     WE ARE NOT RESPONSIBLE FOR ANY PAYMENT ON OLD OR WRONG ACCOUNT DETAILS.</p>
                </div>
                {showDepositAndWithdrawal ? <DepositAndWithdrawalPage /> : showFundTransfer ? <FundTransfer/> : showGetID ? <GetID/> : <MyID/>}
            </div>
        </div>
    )
}

export default DepositPage