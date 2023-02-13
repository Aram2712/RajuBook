import React, {useEffect, useState} from 'react';
import {useWindowScroll} from "react-use";
import "./scroll.css"

function ScrollToTop() {
    const {y: pageYOOffset} = useWindowScroll()
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (pageYOOffset > 30) {
            setVisible(true)
        } else{
            setVisible(false)
        }
    }, [pageYOOffset])

    if (!visible) {
        return false
    }

    return (
        <div className={"scrollContainer"} onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
            <i className="fas fa-arrow-up scrollIcon"></i>
        </div>
    );
}

export default ScrollToTop;
