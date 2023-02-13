import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import PayInfoForUsers from './PayInfoForUsers/index';
import styles from './withdrawal.module.css';
import { useGlobalContext } from '../../../context';
import * as constants from '../../../constants';
import { getAllAccounts } from '../../../actions/getAllAccounts';

const Withdrawal = () => {
    const userInfo = useSelector(state => state.user);
    const depositTypes = useSelector(state => state.owner);
    const accounts = useSelector(state => state.accounts);
    const { bankImages, casinoGamesData } = useGlobalContext();
    const [depo, setDepo] = useState([]);
    const [payInfo, setPayInfo] = useState([]);
    const [selectedOptionExchange, setSelectedOptionExchange] = useState(null);
    const [selectedAccountChange, setSelectedAccountChange] = useState(null);
    const [selectedId, setSelectedId] = useState('');
    const [filterAccounts, setFilterAccounts] = useState();
    const allAccounts = useSelector(state=>state.accounts);
    const [depoType, setDepoType] = useState([])
    const [accountsNumbers, setAccountsNumbers] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState("");
    const [errorChoose, setErrorChoose]=useState(false);
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem("user")).id


    const exchange = [
        { value: 'Rajubooks.co ' + `${userInfo.email ? '(' + userInfo.email + ')' : ''}`, label: 'Rajubooks.co ' + `${userInfo.email ? '(' + userInfo.email + ')' : ''}` }
    ];

    useEffect(() => {
        const m=casinoGamesData.map(item => {return {value: item.title, label: item.title}})
        setAccountsNumbers(m)
    }, [])
    console.log(accountsNumbers)
    useEffect(()=>{
        if(payInfo.title == "Bank Accounts"){
            setDepoType(depo=>allAccounts.filter(x=>x.bankInfo=="bank"))
        }
        else if(payInfo.title == "Google Accounts") {
            setDepoType(depo=>allAccounts.filter(x=>x.bankInfo=="gPay"))
        }
        else if(payInfo.title == "PhonePe Accounts") {
            setDepoType(depo=>allAccounts.filter(x=>x.bankInfo=="phonepe"))
        }        
        else if(payInfo.title == "Paytm Accounts") {
            setDepoType(depo=>allAccounts.filter(x=>x.bankInfo=="paytm"))
        }
    },[payInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ref_id=Math.round(Math.random()*100000);
        const data={
            gameName:selectedAccount.value,
            playerEmail:userInfo.email,
            amount
        }
        console.log(data)
        if(selectedAccount){
            await fetch(`${constants.baseURL}/withdrawal`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            .then(response=>response.text())
            .then(result => {
                console.log(result);
                if(result){
                    setSelectedAccount("")
                    setAmount("");
                }
            })
            .catch(err => console.log(err))
            }
        else{
            setErrorChoose(true)
        }
    }

    return (
        <div className={styles.mainDepositBlock}>
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
            {/* <div className={styles.selectAccountBlock}>
                <ul>
                    {
                        depositTypes.map(singleDepo => {
                            return <li key={singleDepo.id}>
                                <button onClick={() => { setFilterAccounts(singleDepo); setSelectedId(singleDepo.id);
                                    setSelectedAccount(""); setPayInfo(singleDepo)
                                
                                }}>
                                    <img className={selectedId === singleDepo.id ? styles.activePayment : ''} src={bankImages[singleDepo.id - 1]} alt="singleDepo" />
                                </button>
                            </li>
                        })
                    }
                </ul>
            </div> */}
            {/* <PayInfoForUsers payInfo={filterAccounts} depoType = {depoType}/> */}
            <div className={styles.mainForm}>
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.fileInputLine} flex`}>
                        <Input required className={styles.countInput} value={amount} type='number' placeholder="Amount" onChange={(e) => setAmount(e)} />
                        <input type="submit" value="Send" className={styles.submitBtn} />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Withdrawal
