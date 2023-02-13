import { useState } from 'react';
import styles from './input.module.css';
import passwordEye from '../../../Images/passwordEye.png';
import { useGlobalContext } from '../../../context';

const Input = ({type, placeholder, id, value, onChange, name }) => {
    const [passwordType, setPasswordType] = useState(type)

    return <div className={styles.inputMainBlock}>
        <div className={styles.passwordInput}>
            <input name={name} onChange={onChange} value={value} id={id} className={styles.input} type={passwordType} placeholder={placeholder} />
            {id === "password" && <img className={styles.passwordEye} onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")} src={passwordEye} alt="password" />}
        </div>
    </div>
}

export default Input