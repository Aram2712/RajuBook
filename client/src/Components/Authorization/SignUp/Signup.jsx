import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from '../../../context';
import mainLogo from '../../../Images/logo.svg';
import invalidIcon from '../../../Images/invalidPassword.png';
import Input from './Input/Input';
import styles from './authmodal.module.css';
import { useEffect, useState } from 'react';
import * as constants from "../../../constants";
import 'react-phone-number-input/style.css'
import PhoneInput,{ getCountries, getCountryCallingCode } from 'react-phone-number-input';
import smile from "../../../Images/success.gif";

const SignUp = () => {
    ReactModal.setAppElement('#root');

    const dispatch = useDispatch();
    const status = useSelector(state => state.registerStatus);
    const [isValidPassword, setIsvalidPassword] = useState(false);
    const [showIcon, setShowIcon] = useState(false)
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState('+91');
    const [whatsapp, setWhatsAppNumber] = useState('');
    const [successRegistr, setSuccessRegistr]=useState(false);
    const { registerUser, isInvalidRegister, setIsInvalidRegister, openModal, setRegisterUser, isRegisterModalOpen, closeRegisterModal } = useGlobalContext();
  
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password === confirmPassword){
        await fetch(`${constants.baseURL}/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fullName,
                email,
                password,
                city,
                phone,
                whatsapp
            })
        })
        .then(response => response.json())
        .then(result => {

            if(result[0].id){
                setSuccessRegistr(true)
            }
            else if(result=="User already exist"){
                console.log(result)
                setIsInvalidRegister(true)
            }
            else {
                  setIsInvalidRegister(true)
            }
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");
            setWhatsAppNumber("");
            setCity("");
        })
        .catch(error =>  setIsInvalidRegister(true))
    }
    else {
        setIsvalidPassword(true)
    }
    
    }


    const alreadyHaveAccountFunction = () => {
        closeRegisterModal();
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCity('');
        setPhone('');
        setWhatsAppNumber('');
        openModal()
    }


    const closeRegisterSuccess=()=>{
        setSuccessRegistr(false);
        closeRegisterModal();
        openModal()
    }
    
    return (
        <>
        {
            !successRegistr?
        <ReactModal
            isOpen={isRegisterModalOpen}
            onRequestClose={closeRegisterModal}
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
                    maxWidth: `${400}px`,
                    margin: '0 auto',
                    maxHeight:"650px",
                    border: '1px solid #fd4fc1',
                    background: '#000000',
                    WebkitOverflowScrolling: 'touch',
                    overflowY:"auto",
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '0 20px',
                    inset: '0',

                }
            }}
        >
            <button className={styles.closeBtn} onClick={closeRegisterModal} ><i className="fa-solid fa-xmark"></i></button>
            
            <form onSubmit={handleSubmit} >
                <img className={styles.logo} src={mainLogo} alt="mainLogo" />
                <Input onChange={(e)=>setFullName(e.target.value)} value={fullName} name={'full_name'} id={'fullname'} type={'text'} placeholder={'Full Name'} />
                <Input onChange={(e)=>setEmail(e.target.value)} required={true} value={email} name={'email'} id={'email'} type={'email'} placeholder={'Email Address'} />
                <Input onChange={(e)=>setPassword(e.target.value)} required={true} value={password} name={'password'} id={'password'} type={'password'} placeholder={'Password'} />
                <Input onChange={(e)=>setConfirmPassword(e.target.value)} required={true} value={confirmPassword} name={'confirmPassword'} id={'confirmPassword'} type={'password'} placeholder={'Confirm Password'} />
                <Input onChange={(e)=>setCity(e.target.value)} value={city} name={'city'} id={'city'} type={'text'} placeholder={'City (Optional)' }/>
                <PhoneInput className={styles.mobileNumber} defaultCountry={"IN"} name={'phone'} value={phone} id={'phone'} onChange={(e) => setPhone(e)} required={true}/>
                <div className={styles.registr_whatsapp_number}>
                    <i className="fa fa-whatsapp" style={{fontSize:"24px", color:"violet", marginLeft:"15px"}}></i>
                    <input className={styles.registr_whatsapp_input} placeholder="WhatsApp Number" type={"tel"} value={whatsapp} name={'whatsapp'} id={'whatsupp'} onChange={(e) => setWhatsAppNumber(e.target.value)}/>
                </div>

                {isInvalidRegister && <p className={styles.invalidMessage}><img src={invalidIcon} alt="invIcon" />User Already Exists</p>}
                <button className={styles.signInBtn}>Register</button>
                <button className={styles.alreadyText} onClick={alreadyHaveAccountFunction}>Already have an account?</button>
                {
                    isValidPassword ?  <i className="fa-solid fa-xmark" style={{ position: 'absolute', fontSize: '25px', right: '1%', top: '48%', color: 'red' }}></i> : null
                }
            </form>
        
        
        </ReactModal>
        :
        <ReactModal 
            isOpen={successRegistr}
            onRequestClose={closeRegisterSuccess}
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
                    maxWidth: `${400}px`,
                    margin: '0 auto',
                    maxHeight:"300px",
                    border: '1px solid #fd4fc1',
                    background: '#000000',
                    WebkitOverflowScrolling: 'touch',
                    overflowY:"auto",
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '0 20px',
                    inset: '0',

                }
        }}>
            <div className={styles.success_registr_exit_box}>
                <i className="fa-solid fa-xmark"  
                    style={{color:"rgba(255,255,255,0.5)", 
                    fontSize:"25px", cursor:"pointer"}}
                    onClick={closeRegisterSuccess}></i>
            </div>
            <img src={smile} className={styles.success_modal_image}/>
            <h3 className={styles.success_modal_head}>You Are Successfully Registered</h3>
        </ReactModal>
    }
        </>
        
  
    )
}

export default SignUp