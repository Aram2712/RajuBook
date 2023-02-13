import { useState, useContext, createContext } from "react";
import { useSelector } from "react-redux";
import bankLogo from './Images/bank.png';
import googleLogo from './Images/google-pay.png';
import phonePeLogo from './Images/phonepe.png';
import paytm from './Images/paytm.png';
import depositLogo from "./Images/payment.png";
import lotus from "./Images/images/lotus.png";
import tenexch from "./Images/images/tenexch.png";
import upexch from "./Images/images/upexch.png";
import world from "./Images/images/world.png";
import god777 from "./Images/images/god777.png";
import diamond from "./Images/images/diamond.png";
import taj from "./Images/images/taj777.png";
import lords from "./Images/images/lords.png";
import * as constants from './constants';

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const [isInvalidRegister, setIsInvalidRegister] = useState(false);
    const [isChecked, setisChecked] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
    const [showChangePassword, setShowChangePassword]=useState(false)
    const [user, setUser] = useState({ email: '', password: '' });
    const [loginedUser, setLoginedUser] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const thisUser = useSelector(state => state.user);
    const [isOpenGetIdCard, setIsOpenGetIdCard] = useState(false);
    const id =localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).id : null;

    const [registerUser, setRegisterUser] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword:'',
        city: '',
        phone: '',
        whatsapp: ''
    })
    
    const [newAccountFormForBank, setNewAccountFormForBank] = useState({
        id:id,
        bankInfo: 'bank',
        accountNo: '',
        ifscCode: '',
        holderName: "",
        password: ""
    })

    const [newAccountFormForOtherPayment, setNewAccountFormForOtherPayment] = useState({
        id:id,
        bankInfo: 'gPay',
        phoneNo: '',
        upiId: '',
        holderName: '',
        password: ''   
    })

    const openModal = () => {
        setIsModalOpen(true);
        closeForgotPassword()
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsInvalidLogin(false)
    };

    const openForgotPassword = () => {
        closeModal();
        setShowForgotPassword(true)
    }

    const closeForgotPassword = () => {
        setShowForgotPassword(false);
        setShowForgotPasswordForm(false)
        setEmailAddress('')
    }

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true)
        closeForgotPassword()
    }
    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
        setIsInvalidRegister(false)
    }
    const openChangePassword=()=>{
        setShowChangePassword(true);
        closeModal();
    }
    

    const casinoGamesData = [
        {
            id: 1,
            img: lotus,
            title: "LOTUS",
            login:"login",
            password:"abcd1234"
        }, {
            id: 2,
            img: tenexch,
            title: "TENEXCH",
            login:"login",
            password:"abcd1234"
        }, {
            id: 3,
            img: upexch,
            title: "UPEXCH",
            login:"login",
            password:"abcd1234"
        }, {
            id: 4,
            img: world,
            title: "WORLD",
            login:"login",
            password:"abcd1234"
        }, {
            id: 5,
            img: god777,
            title: "GOD777",
            login:"login",
            password:"abcd1234"
        }, {
            id: 6,
            img: diamond,
            title: "DIAMOND",
            login:"login",
            password:"abcd1234"
        }, {
            id: 7,
            img: taj,
            title: "TAJ777",
            login:"login",
            password:"abcd1234"
        }, {
            id: 8,
            img: lords,
            title: "LORDS",
            login:"login",
            password:"abcd1234"
        }
    ]
    const bankImages = [bankLogo, googleLogo,depositLogo, phonePeLogo, paytm];
    

    return <AppContext.Provider value={{
        id,
        user,
        bankImages,
        isModalOpen,
        isInvalidLogin,
        isInvalidRegister,
        isChecked,
        registerUser,
        isRegisterModalOpen,
        loginedUser,
        newAccountFormForBank, 
        newAccountFormForOtherPayment, 
        showForgotPassword, 
        emailAddress, 
        showForgotPasswordForm, 
        setShowForgotPasswordForm,
        openForgotPassword,
        setEmailAddress,
        closeForgotPassword,
        setShowForgotPassword,
        setNewAccountFormForOtherPayment,
        setNewAccountFormForBank,
        setLoginedUser,
        setIsInvalidRegister,
        setIsRegisterModalOpen,
        closeRegisterModal,
        openRegisterModal,
        setRegisterUser,
        setUser,
        setisChecked,
        setIsInvalidLogin,
        setIsModalOpen,
        openModal,
        closeModal,
        openChangePassword,
        setShowChangePassword,
        showChangePassword,
        casinoGamesData,
        isOpenGetIdCard, 
        setIsOpenGetIdCard
    }}>
        {children}
    </AppContext.Provider>
}


const useGlobalContext = () => {
    return useContext(AppContext)
}


export  { AppProvider, useGlobalContext }