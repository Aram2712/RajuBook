import React, {useState} from 'react';
import { useSelector } from 'react-redux';
// import { useGlobalContext } from '../../../context';
import lotus from "./images/lotus.png";
import tenexch from "./images/tenexch.png";
import upexch from "./images/upexch.png";
import world from "./images/world.png";
import god777 from "./images/god777.png";
import diamond from "./images/diamond.png";
import taj from "./images/taj777.png";
import lords from "./images/lords.png";
import styles from "./casinoGames.module.css";

function List() {
    // const { openModal } = useGlobalContext();
    // const user = useSelector(state => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const [isInvalidRegister, setIsInvalidRegister] = useState(false);
    const [isChecked, setisChecked] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
    const [user, setUser] = useState({ email: '', password: '' });
    const [loginedUser, setLoginedUser] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const closeForgotPassword = () => {
        setShowForgotPassword(false);
        setShowForgotPasswordForm(false)
        setEmailAddress('')
    }

    const openModal = () => {
        setIsModalOpen(true);
        closeForgotPassword()
    };
    const handleClick = () => {
        // if (!(user.email && user.password)) {
        //     openModal()
        // }
    }

    const casinoGamesData = [
        {
            id: 1,
            img: lotus,
            title: "LOTUS247"
        }, {
            id: 2,
            img: tenexch,
            title: "TENEXCH"
        }, {
            id: 3,
            img: upexch,
            title: "UPEXCH"
        }, {
            id: 4,
            img: world,
            title: "WORLD"
        }, {
            id: 5,
            img: god777,
            title: "GOD777"
        }, {
            id: 6,
            img: diamond,
            title: "DIAMOND"
        }, {
            id: 7,
            img: taj,
            title: "TAJ777"
        }, {
            id: 8,
            img: lords,
            title: "LORDS"
        }
    ]

    return (
        <div className={styles.casinoGamesContext}>
            {casinoGamesData.map((item) => (
                <div className={styles.listItem} key={item.id}>
                    <button className={styles.itemBlock} onClick={handleClick}><img src={item.img} alt={item.title} /></button>
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
}

export default List;
