import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from '../../../context';
import mainLogo from '../../../Images/logo.svg';
import invalidIcon from '../../../Images/invalidPassword.png';
import ForgotPassword from '../Forgotpassword/ForgotPassword';
import ChangePassword from '../ChangePassword/ChangePassword';
import Input from '../Input/Input.jsx'
import styles from './authmodal.module.css';
import { getUser} from '../../../actions/getUser.js';
import { loginApi} from '../../../actions/loginApi.js';
import * as constants from "../../../constants";

const SignIn = () => {

    ReactModal.setAppElement('#root');
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // const loginedUser = useSelector(state => state.user)
    const { isModalOpen, openRegisterModal,loginedUser, setIsModalOpen,openForgotPassword, closeModal, 
            isInvalidLogin, isChecked, setisChecked, setIsInvalidLogin, user, setLoginedUser, setUser,
            openChangePassword, showChangePassword } = useGlobalContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await fetch(`${constants.baseURL}/login_users`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.id){
              
                setLoginedUser(result)
                closeModal();
                setEmail("");
                setPassword("") ;
                // window.location.reload()
            }
            
            
        })
        .catch(error => {setIsInvalidLogin(true);console.log(error)})

    }
    useEffect(() => {
        if (loginedUser && loginedUser.email && loginedUser.password) {
            localStorage.setItem('user', JSON.stringify(loginedUser))
            closeModal()
        }
    }, [loginedUser])

   
    const dontHaveAnAccount = () => {
        closeModal();
        openRegisterModal();
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
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
                        maxWidth: '400px',
                        maxHeight:"500px",
                        margin: '0 auto',
                        border: '1px solid #fd4fc1',
                        background: '#000000',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        overflowY:"auto",
                        outline: 'none',
                        padding: '20px',
                        inset: '0'
                    }
                }}
            >
                <button className={styles.closeBtn} onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
                <form onSubmit={handleSubmit}>
                    <img className={styles.logo} src={mainLogo} alt="mainLogo" />
                    <Input onChange={(e)=>setEmail(e.target.value)} value={email} name={'email'} id={'email'} type={'email'} placeholder={'Email Address'} />
                    <Input onChange={(e)=>setPassword(e.target.value)} value={password} name={'password'} id={'password'} message={'Enter your Password'} type={'password'} placeholder={'Password'} />
                    {isInvalidLogin && <p className={styles.invalidMessage}><img src={invalidIcon} alt="invIcon" /> Invalid Login or Password</p>}
                    <button className={styles.signInBtn}>Sign In</button>
                </form>
                <p className={styles.forgotMessage} onClick={openForgotPassword}><button className={styles.forgotPasswordBtn}>Forgot password</button>?</p>
                <p className={styles.dontHaveAnAccount} onClick={dontHaveAnAccount}><button>Don't have an account?</button></p>
            </ReactModal>
            <ForgotPassword/>
            <ChangePassword/>
        </>
    )
}

export default SignIn