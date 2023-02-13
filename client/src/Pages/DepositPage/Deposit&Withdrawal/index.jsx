import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Deposit from '../Deposit';
import Withdrawal from '../Withdrawal';
import { getAllAccounts } from '../../../actions/getAllAccounts.js';
import { getOwnerInfo } from '../../../actions/getOwnerInfo.js';
import styles from './depositAndWithdrawal.module.css';
import CreateAccount from '../CreateAccount';
import * as constants from '../../../constants';

const DepositAndWithdrawalPage = () => {
    const [showDeposits, setShowDeposits] = useState(true);
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [userId, setUserId] = useState({id:JSON.parse(localStorage.getItem("user")).id})

    const dispatch = useDispatch()


    const showOnlyDeposits = () => {
        setShowDeposits(true);
        setShowWithdrawal(false);
        setShowCreateAccount(false)
    }

    const showOnlyWithdrawal = () => {
        setShowDeposits(false);
        setShowWithdrawal(true)
        setShowCreateAccount(false)
    }

    const showOnlyCreateAccount = () => {
        setShowDeposits(false)
        setShowWithdrawal(false)
        setShowCreateAccount(true)
    }


    useEffect(() => {
        dispatch(getOwnerInfo())
      
    }, [])


    useEffect(() => {
        dispatch(getAllAccounts(userId))

    }, [dispatch])

    return (
        <div className={styles.depositAndWithdrawalPage}>
            <div className="container">
                <div className={styles.btnControl}>
                    <button className={showDeposits ? styles.active : ''} onClick={showOnlyDeposits}>Deposit</button>
                    <button className={showWithdrawal ? styles.active : ''} onClick={showOnlyWithdrawal}>Withdrawal</button>
                    <button className={showCreateAccount ? styles.active : ''} onClick={showOnlyCreateAccount}>Create Account</button>
                </div>
                {showDeposits ? <Deposit /> : showWithdrawal ? <Withdrawal /> : showCreateAccount ? <CreateAccount /> : ''}
            </div>
        </div>
    )
}

export default DepositAndWithdrawalPage