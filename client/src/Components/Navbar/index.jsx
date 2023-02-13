import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import { getUser } from '../../actions/getUser';
import depositImage from '../../Images/deposit.gif';
import logo from '../../Images/logo.svg';
import styles from './navbar.module.css';
import * as constants from "../../constants";
import ReactModal from 'react-modal';
import empty from '../../Images/icon.png';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem("user"))
    const [userBalance, setUserBalance]=useState(0)
    const [openMenu, setOpenMenu] = useState(false);
    const [showMobile, setShowMobile] = useState(false);
    const [userData, setUserData]=useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal]=useState(false);
    const { isModalOpen, openModal, setLoginedUser,loginedUser, 
        closeRegisterModal, setIsModalOpen, setIsRegisterModalOpen, 
        closeModal, isRegisterModalOpen, openRegisterModal, openChangePassword } = useGlobalContext()
    const navigate = useNavigate()
    const openRegistrationForm = () => {
        openRegisterModal();
        closeModal();
        setIsModalOpen(false)
        setOpenMenu(false)
        setShowMobile(false)
    }
    const {id} = useGlobalContext();
    useEffect(()=>{
        if(user) {
            fetch(`${constants.baseURL}/send_balance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            })
                .then(response => response.json())
                .then(result => setUserBalance(result.balance))
                .catch(err => console.log(err))
        }
    },[])

    useEffect(()=>{
        if(user) {

            fetch(`${constants.baseURL}/get_payment_status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email
                })

            })
                .then(response => response.json())
                .then(result => (result))
                .catch(err => console.log(err))
        }
    },[])

    const openLoginForm = () => {
        openModal();
        setIsRegisterModalOpen(false);
        closeRegisterModal();
        setOpenMenu(false)
        setShowMobile(false)
    }

    async function fetchUser() {
        await setLoginedUser(JSON.parse(localStorage.getItem('user')))
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (loginedUser) {
            dispatch(getUser(loginedUser))
        }
    }, [loginedUser])

    const logout = () => {
        localStorage.clear();
        navigate('/')
        window.location.reload()
        setLoginedUser('');
        setOpenMenu(!openMenu)
    }

    useEffect(() => {
        window.onresize = () => {
            if (window.innerWidth < 600) {
                setOpenMenu(false)
                setShowMobile(false)
            }
            else {
                setShowMobile(false)
            }
        }
    }, [window.innerWidth])
    const openDeleteModal=()=>{
        setIsOpenDeleteModal(true);
        setUserData(false)
    }
    const closeDeleteModal=()=>{
        setIsOpenDeleteModal(false);
    }
    const deleteAccount=()=>{
        fetch(`${constants.baseURL}/deactivate_account`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:user.id})
        })
        .then(response=>response.json())
        .then(result=>{
            console.log(result);
            localStorage.clear(); 
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    return (
        <nav className={styles.nav}>
            <div className="container flex js-content-sb" style={{height: "95px"}}>
                <Link to={'/'} className={styles.logo} onClick={() => { setOpenMenu(false); setShowMobile(false) }}>
                    <img src={logo} alt="logo" className={styles.logoImage} />
                </Link>
                {
                    loginedUser?
                    <Link to='/deposit' className={styles.depositBtn} 
                        onClick = {()=>{setShowMobile(false);setOpenMenu(false)}}>
                        <img src = {depositImage} style={{display:showMobile?"none":"inline-block"}} className={styles.animation_deposit_image}/>
                    </Link>
                    : null
                }
                <button className={styles.hamburgerBtn} onClick={() => { setOpenMenu(!openMenu); setShowMobile(!showMobile) }}>{openMenu ? <i className="fa-solid fa-xmark"></i> : <i className='fa-solid fa-bars'></i>}</button>
                {
                    !showMobile ?
                        (
                            <div className={styles.mainPart}>
                                {
                                    loginedUser ?
                                        (
                                            <div className={styles.loggedUser}>
                                                <ul>
                                                    <li>
                                                        <div className={styles.userInformation}>
                                                
                                                            <i className="fa fa-user" style={{fontSize:"30px", cursor:"pointer", color:"rgba(255,255,255,0.8)"}}></i>
                                                            {
                                                                userData?
                                                                <i className="fa fa-angle-up" onClick={()=>setUserData(!userData)} style={{fontSize:"20px", margin:"0 10px", cursor:"pointer", color:"rgba(255,255,255,0.8)"}}></i>
                                                                :
                                                                <i className="fa fa-angle-down" onClick={()=>setUserData(!userData)} style={{fontSize:"20px", margin:"0 10px", cursor:"pointer", color:"rgba(255,255,255,0.8)"}}></i>
                                                            }
                                                            </div>
                                                        <div className={styles.hidden_user_informacia_box} style={{display:userData?"flex":"none"}}>
                                                           <ul className={styles.userInformationList}>
                                                                <li>{loginedUser.email.split("@")[0]}</li>
                                                                <li>Balance: {userBalance} <i className="fa fa-rupee" style={{fontSize:"12px",padding:"3px"}}></i></li>
                                                                <li style={{cursor:"pointer"}} className={styles.change_password_li}  onClick={()=>{openChangePassword();setUserData(false)}}>Change Password</li>
                                                                <li><button onClick={logout} className={styles.logoutBtn}>Log Out</button></li>
                                                                <li style={{color:"red", margin:"0 0 10px 0", cursor:"pointer"}} onClick={openDeleteModal}>Delete Account</li>
                                                           </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className={styles.registerPartButtons}>
                                                <div className={styles.registerBlock}>
                                                    {!isModalOpen && <button onClick={openLoginForm} className={styles.loginBtn}>Login</button>}
                                                </div>
                                                <div className={styles.registerBlock}>
                                                    {!isRegisterModalOpen && <button onClick={openRegistrationForm} className={styles.loginBtn}>Register</button>}
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        )
                        :
                        (
                            <div className={`${styles.mobilePart} ${openMenu ? styles.open : ''}`}>
                                {
                                    loginedUser ?
                                        (
                                            <div className={styles.userInformation}>
                                                <ul>
                                                    <li className={styles.userDataHeader}>
                                                        <p className={styles.loginedUserName}>{loginedUser.email.split("@")[0]}</p>
                                                    </li>
                                                    <li>
                                                        <p className={styles.mobile_balance_text}>Balance: {userBalance} <i className="fa fa-rupee" style={{fontSize:"20px",marginLeft:"5px"}}></i></p>
                                                    </li>
                                                    <li style={{cursor:"pointer"}} className={styles.mobile_change_password_li}  onClick={()=>{openChangePassword();setUserData(false)}}>Change Password</li>
                                                    <li>
                                                        <div className={styles.userInformationData}>
                                                            <button onClick={logout} className={styles.logoutBtn}>Log Out</button>
                                                        </div>
                                                    </li>
                                                    <li style={{color:"red", margin:"0 0 10px 0", cursor:"pointer"}} onClick={openDeleteModal}>Delete Account</li>
                                                </ul>

                                            </div>
                                        )
                                        :
                                        (
                                            <div className={styles.registerPartButtonsMobile}>
                                                <div className={styles.registerBlock}>
                                                    {!isModalOpen && <button onClick={openLoginForm} className={styles.loginBtn}>Login</button>}
                                                </div>
                                                <div className={styles.registerBlock}>
                                                    {!isRegisterModalOpen && <button onClick={openRegistrationForm} className={styles.loginBtn}>Register</button>}
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        )
                }
            </div>
            <ReactModal
                    isOpen={isOpenDeleteModal}
                    onRequestClose={closeDeleteModal}
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
                    }}
                >
                    <div className={styles.deleteModalCloseIcon}>
                        <i className="fa-solid fa-xmark" style={{fontSize:"24px", cursor:"pointer"}} onClick={closeDeleteModal}></i>
                    </div>
                    <p className={styles.deleteAccountHead}>Are You Sure You Want To <br/>Delete Your Account?</p>   
                    <div className={styles.deleteModalButtons}>
                        <button className={styles.yesButton} onClick={deleteAccount}>YES</button>
                        <button className={styles.noButton} onClick={closeDeleteModal}>NO</button>

                    </div>
            </ReactModal>
            
        </nav>
    )
}

export default Navbar