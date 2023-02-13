import React, {useState, useEffect} from "react";
import './MyID.css';
import {useGlobalContext} from '../../../context';
import * as constants from '../../../constants';


function MyID() {
    const {casinoGamesData} = useGlobalContext();
    const user = JSON.parse(localStorage.getItem("user"));
    const [myIdData, setMyIdData] = useState([])
    useEffect(()=>{
        fetch(`${constants.baseURL}/send_user_my_id`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:user.id})
        })
        .then(response=>response.json())
        .then(result=> {setMyIdData(result); console.log(result)})
        .catch(err=>console.log(err))
    },[])

    return (
        <div className="my_id">
            {
                myIdData.reverse().map(item=>
                <div className="id_info_box" key = {item.id}>
                    <div className="id_info_header_box" style = {{background:"#fd4fc1"}}>
                        <p className="id_info_header_text">{item.gameName}</p>
                    </div>
                    <div className="id_info_main_box">
                        <div className="id_info_main_left_box">
                            <p>User Name :</p>
                            <p>Password :</p>
                            <p>Amount :</p>
                        </div>
                        <div className="id_info_main_right_box">
                            <p>{item.userName} </p>
                            <p>{item.gameCode} </p>
                            <p>{item.amount}<i className="fa fa-rupee" style={{fontSize:"12px",padding:"3px"}}></i></p>
                        </div>
                    </div>
                </div>  
                    
                )
            }
            
        </div>
    )
}

export default MyID