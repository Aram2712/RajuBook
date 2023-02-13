import React from 'react';
import styles from "./Button.module.css"

export const ButtonLink = ({href, content, width, height,fontSize,className}) => {
    return <a className={`${styles.btnStyle} ${className}`} style={{width: width, height: height ,fontSize:fontSize}} href={href}>{content}</a>
};

