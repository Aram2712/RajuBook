import { useState } from 'react';
import styles from './input.module.css';
import passwordEye from '../../../../Images/passwordEye.png';
import { useGlobalContext } from '../../../../context';

const Input = ({ message, type, placeholder, width = '100%', maxWidth = '100%', id, value, margin = { marginTop: 10, marginRight: 0, marginLeft: 0, marginBottom: 0 }, onChange, name, color = 'white', required = false }) => {
    const { isInvalid } = useGlobalContext()
    const [passwordType, setPasswordType] = useState(type)

    return <div className={styles.inputMainBlock}>
        <p className={styles.inputMessage}><label htmlFor={id}>{message}</label></p>
        <div className={styles.passwordInput}>
            <input required={required} style={{ color, width, maxWidth, marginRight: margin.marginRight }} name={name} onChange={onChange} value={value} id={id} className={styles.input} type={passwordType} placeholder={placeholder} />
            {type === "password" && <img className={styles.passwordEye} onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")} src={passwordEye} alt="password" />}
        </div>
    </div>
}

export default Input