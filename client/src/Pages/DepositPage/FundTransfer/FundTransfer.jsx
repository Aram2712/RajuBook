import React, {useState, useEffect} from "react";
import './FundTransfer.css';
import Select from 'react-select';
import {useGlobalContext} from '../../../context';
import * as constants from '../../../constants';


function FundTransfer() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [allMyId, setAllMyId] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [fromAccount, setFromAccount] = useState("")
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState();
    const [allMyTransfer, setAllMyTransfer] = useState([]);

    useEffect(()=>{
        fetch(`${constants.baseURL}/find_my_id`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:user.id})
        })
        .then(response=>response.json())
        .then(result=>setAllMyId(result))
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
        const x = allMyId.filter(v=>v.status === "Active" );
        const y = x.map(item=>{return {value:item.game_title, label:item.game_title}})
        setActiveId(y);
        
    },[allMyId]);
    console.log(activeId)
    const getAllTransfer = async () => {
        await fetch(`${constants.baseURL}/find_game_transfers`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:user.id
            })
        })
        .then(response => response.json())
        .then(result => setAllMyTransfer(result))
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        getAllTransfer()
    },[])

    const submitTransfer = async () => {
        await fetch(`${constants.baseURL}/transfer_between_games`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:user.id,
                userName:user.email,
                from_gameTitle:fromAccount.value,
                to_gameTitle:toAccount.value,
                amount
            })

        })
        .then(response => response.text())
        .then(result => {
            if(result){
            setAmount("");
            setFromAccount("");
            setToAccount("");
            getAllTransfer()

        }
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="FundTransfer">
            <div className="form_data_box">
                <div className="fundTransfer_select_box">
                    <p className="fundTransfer_select_text">From</p>
                    <Select className="select_fundTrnasfer"
                        options={activeId}
                        onChange={setFromAccount}
                        value = {fromAccount}
                    />
                </div>
                <div className="fundTransfer_select_box">
                    <p className="fundTransfer_select_text">To</p>
                    <Select className="select_fundTrnasfer"
                        options={activeId}
                        onChange={setToAccount}
                        value = {toAccount}
                    />
                </div>
                <div className="fundTransfer_select_box">
                    <p className="fundTransfer_select_text">Amount</p>

                    <input type = "number" className="fundTransfer_amount_input" value = {amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
            </div>
            <div className="fundTransfer_submit_box">
                <button className="fundTransfer_submit_button"  onClick = {submitTransfer}>
                    Fund Transfer
                </button>
            </div>
            <table className="fundTransfer_data_table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Date/Time</th>
                        <th className="status_text">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allMyTransfer.reverse().map(item=>
                            <tr key = {item.id}>
                                <td>{item.from_gameTitle}</td>
                                <td>{item.to_gameTitle}</td>
                                <td>{item.amount}</td>
                                <td>{item.create_at}</td>
                                <td className="status_text">{item.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default FundTransfer