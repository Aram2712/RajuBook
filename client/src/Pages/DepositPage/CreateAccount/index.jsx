import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewAccount } from '../../../actions/createNewAccount';
import { getAllAccounts } from '../../../actions/getAllAccounts';
import Input from '../../../Components/Authorization/SignUp/Input/Input';
import { deleteAccount } from '../../../actions/deleteAccount';
import { useGlobalContext } from '../../../context';
import styles from './style.module.css';

const CreateAccount = () => {
  const depositTypes = useSelector(state => state.owner);
  const user = useSelector(state => state.user);
  const accounts = useSelector(state => state.accounts);
  const dispatch = useDispatch();
  const [depo, setDepo] = useState([])
  const [payInfo, setPayInfo] = useState('');
  const [selectedId, setSelectedId] = useState(3)
  const { bankImages, newAccountFormForBank, setNewAccountFormForBank, newAccountFormForOtherPayment, setNewAccountFormForOtherPayment } = useGlobalContext()
  const [newArrayForAccounts, setNewArrayForAccounts] = useState([])
  const [userId, setUserId] = useState({id:JSON.parse(localStorage.getItem("user")).id})
  const id = JSON.parse(localStorage.getItem("user")).id

  const onChange = (e) => {
    if (selectedId === 3) {
      setNewAccountFormForOtherPayment({ ...newAccountFormForOtherPayment, [e.target.name]: e.target.value })
    } 
  }
  console.log(newAccountFormForOtherPayment)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedId === 3) {
      if (user.email === newAccountFormForOtherPayment.holderName) {
        await  dispatch(createNewAccount({ ...newAccountFormForOtherPayment, bankInfo: selectedId === 3 ? 'Online Payment' : null }))
        await  dispatch(getAllAccounts(userId))

        setNewAccountFormForOtherPayment({
          id:user.id,
          bankInfo: 'Online Payment',
          phoneNo: '',
          upiId: '',
          holderName: '',
          password: ''
        })
        window.scrollTo(0,window.innerHeight)


      } else {
        alert('Error In holdername or password')
      }

    }
  }

  useEffect(() => {
      setNewArrayForAccounts(accounts);
  }, [accounts, user.length])

  return (
    <div className={styles.mainCreateAccountBlock}>
      <div className={styles.selectAccountBlock}>
        <ul>
          {
            depositTypes.map(singleDepo => {
              return <li key={singleDepo.id}>
                <button onClick={() => { setDepo([singleDepo.depoInfo]); setPayInfo(singleDepo); setSelectedId(singleDepo.id) }}>
                  <img className={selectedId === singleDepo.id ? styles.activePayment : ''} src={bankImages[singleDepo.id - 1]} alt="singleDepo" />
                </button>
              </li>
            })
          }
        </ul>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
      {selectedId === 1 ? (
          <div className={styles.inputForm}>
            <div className={styles.create_account_input_box}>
              <p className={styles.create_account_input_text}>Account No</p>
              <input  className={styles.create_account_input}  id={'accountNo'} message={'Account No.'} color='black' value={newAccountFormForBank.accountNo} type='text' name='accountNo'  placeholder="Account No." onChange={onChange} />
            </div>
            <div className={styles.create_account_input_box}>
              <p className={styles.create_account_input_text}>IFSC Code</p>
              <input  className={styles.create_account_input} id={'ifscCode'} message={'IFSC Code'} color='black' value={newAccountFormForBank.ifscCode} type='text' name='ifscCode' placeholder="IFSC Code" onChange={onChange} />
            </div>
            <div className={styles.create_account_input_box}>
              <p className={styles.create_account_input_text}>Account Holder Name</p>
              <input  className={styles.create_account_input} id={'holderName'} message={'Account Holder Name'} color='black' value={newAccountFormForBank.holderName} onChange={onChange} type='text' name='holderName' placeholder="Account Holder Name"  />
            </div>
            <div className={styles.create_account_input_box}>
              <p className={styles.create_account_input_text}>Password</p>
              <input  className={styles.create_account_input} id={'password'} message={'Password'} color='black' onChange={onChange}  value={newAccountFormForBank.password} type='password' name='password' placeholder="Password"  />
            </div>
          </div>
          )
          :
          (
            <div className={styles.inputForm}>
              <div className={styles.create_account_input_box}>
                <p className={styles.create_account_input_text}>Phone No.</p>  
                <input  className={styles.create_account_input}  id={'phoneNo'} message={'Phone No.'} color='black' value={newAccountFormForOtherPayment.phoneNo} type='text' name='phoneNo' placeholder="Phone No." onChange={onChange} />
              </div>
              <div className={styles.create_account_input_box}>
                <p className={styles.create_account_input_text}>UPI ID</p>  
                <input  className={styles.create_account_input}   id={'upiId'} message={'UPI ID'} color='black' value={newAccountFormForOtherPayment.upiId} type='text' name='upiId' placeholder="UPI ID" onChange={onChange} />
              </div>
              <div className={styles.create_account_input_box}>
                <p className={styles.create_account_input_text}>Account Holder Name</p>  
                <input  className={styles.create_account_input}  id={'holderName'} message={'Account Holder Name'} color='black' value={newAccountFormForOtherPayment.holderName} type='text' name='holderName' placeholder="Account Holder Name" onChange={onChange} />
              </div>
              <div className={styles.create_account_input_box}>
                <p className={styles.create_account_input_text}>Password</p>  
                <input  className={styles.create_account_input}   id={'password'} message={'Password'} color='black' value={newAccountFormForOtherPayment.password} type='password' name='password' placeholder="Password" onChange={onChange} />
              </div>
            
            </div>
          )}
        <input type="submit" value="Submit" className={styles.submitBtn} />
      </form>
      <div className={styles.accountsTable}>
        <div className={styles.accountsHeading}><b>Account No./Phone No.</b> <span>IFSC/UPI Code</span><span>Holder Name</span>	<span>Action</span>	</div>
        <ul className={styles.accountsList}>
          {
           
              newArrayForAccounts.map(({ id, phoneNo, accountNo, ifscCode, upiId, holderName, bankInfo }) => {
                return <li key={id} className={styles.tableRow}>
                  <p><b>{phoneNo || accountNo} <span className={
                    bankInfo === 'bank' ? styles.bank :
                      bankInfo === 'gPay' ? styles.gpay :
                        bankInfo === 'paytm' ? styles.paytm :
                          bankInfo === 'phonepe' ? styles.phonepe : ''
                  }>{bankInfo}</span></b></p>
                  <p>{ifscCode || upiId}</p>
                  <p>{holderName}</p>
                  <button onClick={()=>{
                    dispatch(deleteAccount({id}));
                    dispatch(getAllAccounts(userId))
                    }
                  }><i className="fa-solid fa-trash"></i></button>
                </li>
              })
            
          }
        </ul>
      </div>
    </div>
  )
}

export default CreateAccount