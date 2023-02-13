import { useEffect,useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from '../../../context';
// import { sendPasswordToEmail } from '../../../actions/sendForgottenPassword';
import Input from '../SignUp/Input/Input';
import mainLogo from '../../../Images/logo.svg'
import styles from './forgotpassword.module.css';
import * as constants from '../../../constants';

const ForgotPassword = () => {
    ReactModal.setAppElement('#root');
    const dispatch = useDispatch();
    const resetedPassword = useSelector(state => state.resetPassword)
    const { showForgotPassword,showForgotPasswordForm, setShowForgotPasswordForm,  setShowForgotPassword, emailAddress, setEmailAddress, closeForgotPassword } = useGlobalContext();
    const [email, setEmail] = useState("");
    const [forgotError, setForgotError]=useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        // if(email){
            fetch(`${constants.baseURL}/restore_password`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            })
            .then(response => response.text())
            .then(result=> {
                if(result=="Password sent to email"){
                    setShowForgotPasswordForm(true);
                }
                else{
                    setForgotError(true);
                }
            })
            .catch(err=> console.log(err))
        // }
    }

    
    useEffect(
        () => {
    //   if(resetedPassword.data === 'OK' && resetedPassword.status === 200){
    //     setShowForgotPasswordForm(true)
    //   }
    }, [resetedPassword]
    )

    return (
        <div className={styles.mainForgotPassword}>
            <ReactModal
                isOpen={showForgotPassword}
                onRequestClose={closeForgotPassword}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 95,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        position: 'relative',
                        maxWidth: '400px',
                        margin: '0 auto',
                        border: '1px solid #fd4fc1',
                        background: '#000000',
                        overflow: 'visible',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        inset: '0'
                    }
                }}
            >
                <button className={styles.closeBtn} onClick={closeForgotPassword}><i className="fa-solid fa-xmark"></i></button>
                {
                    showForgotPasswordForm ? (
                        <div className={styles.forgotPasswordEmailPart}>
                            <img className={styles.logo} src={mainLogo} alt="mainLogo" />
                            <p>Your password is sent to your email address!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <img className={styles.logo} src={mainLogo} alt="mainLogo" />
                            <Input onChange={(e)=>setEmail(e.target.value)} required value={email} name={'email'} id={'email'} type={'email'} placeholder={'Enter your Email'} />
                            {
                                forgotError?  <p className={styles.forgot_error_text}><i className="fa-solid fa-xmark" style={{color:"red", fontSize:"16px", margin:"0 10px"}}></i>Invalid email</p> : null
                            }
                          
                            <input type="submit" className={styles.signInBtn} value="Send Password To Email"/>
                        </form>
                    )
                }
            </ReactModal>
        </div>
    )
}

export default ForgotPassword
