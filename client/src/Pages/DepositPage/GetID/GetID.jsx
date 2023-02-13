import React, {useState} from "react";
import './GetID.css';
import { useGlobalContext } from "../../../context";
import GetIdCard from "./GetIdCard/GetIdCard";


function GetID() {
    const {isOpenGetIdCard,setIsOpenGetIdCard,casinoGamesData} = useGlobalContext();
    const [thisGame, setThisGame] = useState()

    return(
        <div className="getid_container">
            {
                casinoGamesData.map(item=>
                    <div className="getid_item_box" key = {item.id}>
                        <div className="getid_item_image_box">
                            <img src = {item.img} className="getid_item_image"/>
                            <h3 className="getid_item_head">{item.title}</h3>
                        </div>  
                        <div className="getid_item_data_box">
                            <p>
                                <span>ID:</span>
                                <span>{item.login}</span>
                            </p>
                            <p>
                                <span>Pass:</span>
                                <span>{item.password}</span>
                            </p>
                            <button className="create_button" onClick={()=>{setIsOpenGetIdCard(true); setThisGame(item)}}>Create Now</button>
                        </div>
                    </div>
                )
            }
            <GetIdCard thisGame = {thisGame}/>
        </div>
    )
}

export default GetID;