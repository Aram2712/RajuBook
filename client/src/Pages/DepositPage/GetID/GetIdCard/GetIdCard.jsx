import React, {useState, useEffect} from 'react';
import { useGlobalContext } from '../../../../context';
import { useDispatch,useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import './GetIdCard.css';
import { getOwnerInfo } from '../../../../api';
import gpay from '../../../../Images/google-pay.png';
import paytm from '../../../../Images/paytm.png';
import phonepe from '../../../../Images/phonepe.png';
import bank from '../../../../Images/bank.png';
import instants from "../../../../Images/payment.png"
import * as constants from '../../../../constants';



function GetIdCard(props) {
    const {isOpenGetIdCard,setIsOpenGetIdCard} = useGlobalContext();
    const dispatch = useDispatch();
    const owner = useSelector(state=>state.owner);
    const userInfo=JSON.parse(localStorage.getItem("user"))
    const closeGetIdCard = () => {
        setIsOpenGetIdCard(false);
    }
    const user = JSON.parse(localStorage.getItem("user"));

    const [images, setImages] = useState([
        // {
        //     img:bank, 
        //     id:1,
        //     active:true,
        //     payName:"Bank Accounts"

        // },
        // {
        //     img:gpay, 
        //     id:2,
        //     active:false,
        //     payName:"Google Accounts"
        // },
        {
            img:instants,
            id:3,
            active:false,
            payName:"Online Payment"
        },
        // {
        //     img:phonepe, 
        //     id:4,
        //     active:false,
        //     payName:"PhonePe Accounts"
        // },
        // {
        //     img:paytm, 
        //     id:5,
        //     active:false,
        //     payName:"Paytm Accounts"
        // }
    ])

    const [thisOwner, setThisOwner] = useState(owner[0]);
    const [next, setNext] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("")
    const [balance, setBalance] = useState()
    const activePay = (e) => {
        setImages(image=>image.map(x=>x.id == e.id ? {...x, active:true} : {...x, active:false}));
        const x = owner.filter(y=>y.title == e.payName);
        setThisOwner(x[0]);
    }
//payment
    const handleSubmit = (e) => {
        e.preventDefault();
        
            if (password == confirm){
            let obj = {
                id:user.id,
                game_title:props.thisGame.title,
                owner_title:thisOwner.title,
                acc_no:thisOwner.acc_no,
                ifsc:thisOwner.ifsc,
                upi_id:thisOwner.upi_id,
                phone_no:thisOwner.phone_no,
                userName,
                password,
                balance
            }
            fetch(`${constants.baseURL}/get_id_request`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
            })
            .then(response=>response.text())
            .then(result=> setIsOpenGetIdCard(false))
            .catch(err=>console.log(err))
            }
        
            
        }
        const payAmount=()=>{
            
                const order_id = Math.round(Math.random() * 100000);
                const paymentData = {
                    order_id,
                    transaction_amount: balance,
                    return_url: 'http://rajubooks.co/',
                    player_email: userInfo.email,
                    player_mobile: userInfo.phone,
                    game_name:props.thisGame.title
                }
                
                fetch(`${constants.baseURL}/payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(paymentData)
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            window.open(result.checkout_url, '_blank');
                        }
                    })
                    .catch(err => console.log(err))     

        }
        
    return(
        <>{
            !next?
        
        <ReactModal
            isOpen={isOpenGetIdCard}
            onRequestClose={closeGetIdCard}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    // position: 'relative',
                    maxWidth: '500px',
                    margin: '95px auto 0 auto',
                    border: '1px solid #fd4fc1',
                    background: 'white',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '10px',
                    outline: 'none',
                    padding: '0px',
                    inset: '0',
                }
            }}
           >   
           
                <div className='get_id_card_header_box'>   
                    <h4 className='get_id_card_head'>Account details</h4>
                    <i className="fa fa-close" style={{fontSize:'25px', color:'white', marginRight:"3%", cursor:"pointer"}}
                        onClick = {() => {closeGetIdCard()}}>
                    </i>
                </div>
                <div className='pay_icons_box'>
                    {
                        images.map(item =>
                            <div className='pay_icons_box2 pay_icons_small_box' key = {item.id}  
                                onClick={activePay.bind(this,item)} style = {{border:item.active ? "5px solid #fd4fc1" : "none"}}>
                                <img src = {item.img} className = "pay_icon"/>
                            </div>
                        )
                    }

                </div>
                {
                    thisOwner && thisOwner.title=="Online Payment"?
                    <div className='get_id_card_choose_account_box'>
                        <input type="number" className='choose_account_select' placeholder='Amount' onChange={(e)=>setBalance(e.target.value)}></input>
                    </div>
                    :
                    <div className='get_id_card_choose_account_box'>
                        <select className='choose_account_select'>
                            <option>{thisOwner.acc_no?thisOwner.acc_no:thisOwner.phone_no}</option>
                        </select>
                    </div>
                }
                <div className='pay_info_box'>
                    <p className='follwoing_details_text'>
                        Pay on following details and click on Next
                    </p>
                    {
                        thisOwner && thisOwner.title == "Bank Accounts" ?
                        <div className='pay_info_data_box'>
                            <div className='pay_info_data_left_box'>
                                <p>Acc. No.:</p>
                                <p>IFSC:</p>
                                <p>Holder Name:</p>
                                <p>Min Deposit :</p>
                                <p>Max Deposit :</p>
                            </div>
                            <div className='pay_info_data_right_box'>
                                <p>{thisOwner.acc_no}</p>
                                <p>{thisOwner.ifsc}</p>
                                <p>{thisOwner.holder_name}</p>
                                <p>{thisOwner.min_dep}</p>
                                <p>{thisOwner.max_dep}</p>

                            </div>
                        </div>
                        :
                        thisOwner && thisOwner.title=="Online Payment" ? null
                        :
                        <div className='pay_info_data_box'>
                            <div className='pay_info_data_left_box'>
                                <p>Phone No</p>
                                <p>UPI ID:</p>
                                <p>Holder Name:</p>
                                <p>Min Deposit :</p>
                                <p>Max Deposit :</p>
                            </div>
                            <div className='pay_info_data_right_box'>
                                <p>{thisOwner.phone_no}</p>
                                <p>{thisOwner.upi_id}</p>
                                <p>{thisOwner.holder_name}</p>
                                <p>{thisOwner.min_dep}</p>
                                <p>{thisOwner.max_dep}</p>

                            </div>
                        </div>
                       

                    }
                
                    <div className='next_button_box'>
                        {
                            thisOwner && thisOwner.title=="Online Payment"?
                            <button className='next_button' onClick={payAmount} style={{marginTop:"20px"}}>SEND</button>
                            :
                            <button className='next_button' onClick = {()=>setNext(true)}>Next</button>

                        }
                    </div>
                </div>
          

        </ReactModal>
        :
        <ReactModal 
            isOpen={isOpenGetIdCard}
            onRequestClose={closeGetIdCard}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    // position: 'relative',
                    maxWidth: '500px',
                    margin: '95px auto 0 auto',
                    border: '1px solid #E4C750',
                    background: 'white',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '10px',
                    outline: 'none',
                    padding: '0px',
                    inset: '0',
                    overflowY:"auto",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                }
            }}
        >
                <div className='get_id_card_header_box'>   
                    <h4 className='get_id_card_head'>Creade ID</h4>
                    <i className="fa fa-close" style={{fontSize:'25px',color:'white', marginRight:"3%", cursor:"pointer"}}
                        onClick = {() =>{ closeGetIdCard(); setNext(false)}}>
                    </i>
                </div>
                <div className='create_id_header_box'>
                    <h3 className='create_id_head'>{props.thisGame.title}</h3>
                </div>
                <input type = "text" value = {userName} onChange = {(e)=>setUserName(e.target.value)} className='userName_input create_form_input' placeholder='Username'/>
                <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)} className='password_input create_form_input' placeholder='Password'/>
                <input type = "password" value = {confirm} onChange = {(e)=>setConfirm(e.target.value)} className='password_input create_form_input' placeholder='Confirm Password'/>
                <input type = "number" value = {balance} onChange = {(e)=>setBalance(e.target.value)} defaultValue={'0'} className='balance_input create_form_input' placeholder='Balance'/>
                <div className='buttons_group_box'>
                    <button className='back_button' onClick = {()=>setNext(false)}>Back</button>
                    <button type = "submit" className='sumbit_button' onClick = {handleSubmit}>Submit</button>
                </div>
                <div className='create_data_inform_box'>
                    <p className='create_data_inform_text'>
                        You Can Check Your Request Status After 5 Min Under MY ID Section.
                    </p>
                </div>
        </ReactModal>
}
    </>
    )
}

export default GetIdCard