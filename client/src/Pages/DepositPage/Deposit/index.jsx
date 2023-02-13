import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import {useNavigate} from "react-router-dom";
import {Content, Input} from 'rsuite';
import {Dropzone, FileItem, FullScreenPreview} from "@dropzone-ui/react";
import 'rsuite/dist/rsuite.min.css';
import {sendDepositToAdmin} from '../../../actions/sendDepositToAdmin.js';
import {getAllAccounts, sendFile} from '../../../api';
import PayInfo from '../PayInfo';
import styles from './deposit.module.css';
import {useGlobalContext} from '../../../context';
import axios from 'axios';
import * as constants from '../../../constants';
import payment from '../../../Images/logo.png'

const Deposit = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const depositTypes = useSelector(state => state.owner);
    const depositSentToAdmin = useSelector(state => state.depositSentToAdmin)
    const {bankImages, casinoGamesData} = useGlobalContext();
    const [depo, setDepo] = useState([]);
    const [payInfo, setPayInfo] = useState('');
    const [selectedOptionExchange, setSelectedOptionExchange] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedId, setSelectedId] = useState('')
    const [file, setFile] = useState([]);
    const [foto, setFoto] = useState("")
    const [fileName, setFileName] = useState("")
    const [imageSrc, setImageSrc] = useState(undefined);
    const [depoType, setDepoType] = useState([])
    const [accountsNumbers, setAccountsNumbers] = useState([]);
    const [amount, setAmount] = useState('')
    const allAccounts = useSelector(state => state.accounts);
    const id = JSON.parse(localStorage.getItem("user")).id
    const [depositTransferData, setDepositTransferData] = useState([])
    const [withdrawalTransferData, setWithDrawalTransferData] = useState([]);
    const [errorChoose, setErrorChoose]=useState(false);

    useEffect(() => {
        fetch(`${constants.baseURL}/find_transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(result => {
                    setDepositTransferData(result[0]);
                    setWithDrawalTransferData(result[1])
                }
            )
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (payInfo.title == "Bank Accounts") {
            setDepoType(depo => allAccounts.filter(x => x.bankInfo == "bank"))
        } else if (payInfo.title == "Google Accounts") {
            setDepoType(depo => allAccounts.filter(x => x.bankInfo == "gPay"))
        } else if (payInfo.title == "PhonePe Accounts") {
            setDepoType(depo => allAccounts.filter(x => x.bankInfo == "phonepe"))
        } else if (payInfo.title == "Paytm Accounts") {
            setDepoType(depo => allAccounts.filter(x => x.bankInfo == "paytm"))
        }
    }, [payInfo])

    useEffect(() => {
        casinoGamesData.map(item => {
            setAccountsNumbers(accountsNumbers => {
                return [...accountsNumbers, {value: item.title, label: item.title}]
            })
        })
    }, [])


    const exchange = [
        {
            value: 'Rajubooks.co ' + `${userInfo.email ? ' (' + userInfo.email + ')' : ''}`,
            label: 'Rajubooks.co ' + `${userInfo.email ? ' (' + userInfo.email + ')' : ''}`
        }
    ];

    const [sendToAdmin, setSendToAdmin] = useState({
        accountNo: null,
        phoneNo: null,
        exchange: exchange[0].value,
        bankInfo: '',
        holderName: '',
        amount: ''
    })

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setFoto(reader.result)
                setFile(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     let obj = {
    //         id,
    //         exchange: exchange[0].value,
    //         account: selectedAccount.label,
    //         amount
    //     }
    //
    //     fetch(`${constants.baseURL}/deposit_request`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(obj)
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result) {
    //                 formData.append("id", result)
    //                 formData.append('fileData', file)
    //                 sendFile(formData)
    //             } else {
    //                 alert("Error");
    //             }
    //             setFile([]);
    //             setSelectedAccount("");
    //             setAmount("")
    //             setFoto()
    //
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     if (depositSentToAdmin === 200) {
    //         window.location.reload()
    //     }
    // }, [depositSentToAdmin])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!selectedAccount){
            setErrorChoose(true);
            console.log(1)
        }
        else{
            const order_id = Math.round(Math.random() * 100000);
            const paymentData = {
                order_id,
                transaction_amount: amount,
                return_url: 'http://localhost:3000',
                player_email: userInfo.email,
                player_mobile: userInfo.phone,
                game_name:selectedAccount
            }
            console.log(paymentData)
            fetch(`${constants.baseURL}/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
            })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    window.open(result.checkout_url, '_blank');
                }
            })
            .catch(err => console.log(err))     
        }
    }
    return (

        <div className={styles.mainDepositBlock}>
           
            <div className={styles.selectAccountBlock}>
                <ul>
                    {
                        depositTypes.map(singleDepo => {
                            return <li key={singleDepo.id}>
                                <button onClick={() => {
                                    setSendToAdmin({
                                        ...sendToAdmin,
                                        bankInfo: singleDepo.title,
                                        accountNo: singleDepo.acc_no,
                                        phoneNo: singleDepo.phone_no,
                                        holderName: userInfo.email
                                    });
                                    setDepo([{value: singleDepo.acc_no, label: singleDepo.acc_no}]);
                                    setPayInfo(singleDepo);
                                    setSelectedId(singleDepo.id);
                                    setSelectedAccount("")
                                }}>
                                    <img className={selectedId === singleDepo.id ? styles.activePayment : ''}
                                         src={bankImages[singleDepo.id - 1]} alt="singleDepo"/>
                                </button>
                            </li>
                        })
                    }
                    {/*<li>*/}
                    {/*    <button className={styles.depositButton} onClick={depositOnline}>*/}
                    {/*        <img src={payment} width={'80px'} alt={'payment'}/>*/}
                    {/*    </button>*/}
                    {/*</li>*/}

                </ul>
            </div>
            <div className={styles.exchangeLine}>
                {/* <div className={styles.chooseAccount}>
                    <p>Exchange</p>
                    <Select
                        className={styles.selectStyle}
                        defaultValue={selectedOptionExchange}
                        onChange={setSelectedOptionExchange}
                        options={exchange}
                    />
                </div> */}
                <div className={styles.chooseAccount}>
                    {
                        errorChoose ? <p style={{color:"red", fontSize:"15px", fontWeight:"500"}}>Please Choose Account</p>
                        :
                        <p>Choose Account</p>
                    }
                    <Select
                        className={styles.selectStyle}
                        options={accountsNumbers}
                        onChange={setSelectedAccount}
                        value={selectedAccount}
                        inputValue=""
                        required
                    />
                </div>
            </div>
            {
                payInfo.title=="Google Accounts" || payInfo.title=="Bank Accounts" || payInfo.title=="PhonePe Accounts" || payInfo.title=="Paytm Accounts" ?
                    <PayInfo payInfo={payInfo}/> : null
            }

            <div className={styles.mainForm}>
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.fileInputLine} flex`}>

                        {/*<div className={styles.hiddenScreenshotBox}>*/}
                        {/*    <p>Drop files here or click to browse</p>*/}
                        {/*    <input type="file" onChange={imageHandler} className={styles.depositScreenshot}/>*/}
                        {/*</div>*/}
                        <Input className={styles.countInput} id={styles.countInput} value={amount} required
                               type='number' placeholder="Amount" onChange={(e) => setAmount(e)}/>
                        <img src={foto} className={styles.screenShot_foto}/>

                    </div>
                    <input type="submit" value="Send" className={styles.submitBtn}/>
                </form>
            </div>
            <table className={styles.table_transfer}>
                <thead>
                <tr>


                    <td className={styles.big_td}>Account</td>
                    <td>Deposit/Withdrawal</td>
                    <td>Amount</td>
                    <td>Date/Time</td>
                </tr>
                </thead>
                <tbody>
                {
                    depositTransferData.reverse().map(item =>
                        <tr key={item.id}>

                            <td className={styles.big_td}>{item.account}</td>
                            <td>{item.deposit}</td>
                            <td>{item.amount}</td>
                            <td>{item.create_at}</td>
                        </tr>
                    )
                }
                {
                    withdrawalTransferData.reverse().map(item =>
                        <tr key={item.id}>
                            <td>{item.account}</td>
                            <td className={styles.big_td}>{item.withdrawal}</td>
                            <td>{item.amount}</td>
                            <td>{item.create_at}</td>
                        </tr>
                    )

                }
                </tbody>
            </table>
        </div>
    )
}

export default Deposit

