import React, {useState} from "react";
import "./ChangePassword.css";
import ReactModal from "react-modal";
import { useGlobalContext } from "../../../context";
import mainLogo from '../../../Images/logo.svg';
import smile from "../../../Images/success.gif";
import * as constants from "../../../constants";


function ChangePassword() {
    const { openChangePassword, showChangePassword, setShowChangePassword, openModal }=useGlobalContext();
    const [showCurrentPassword, setShowCurrentPassword]=useState(false);
    const [showNewPassword, setShowNewPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);
    const [success, setSuccess]=useState(false);
    const [email, setEmail]=useState("");
    const [currentPassword, setCurrentPassword]=useState("");
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [passwordError, setPasswordError]=useState(false);
    const [changeError, setChangeError]=useState(false);
    const closeChangePassword=()=>{
        setShowChangePassword(false)
    }
    const closeChangeSuccess=()=>{
        setShowChangePassword(false);
        setSuccess(false);
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(newPassword==confirmPassword){
        await fetch(`${constants.baseURL}/change_password`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email, 
                password:currentPassword,
                newPassword
            })
        })
        .then(response=>response.text())
        .then(result=>{

            if(result=='Password has changed'){
                setSuccess(true);
            }
            else{
                setChangeError(true);
            }
        })
        .catch(err=>console.log(err))
        }
        else{
            setPasswordError(true);
        }
    }

    return(
        <>{
            !success?
        
             <ReactModal
                isOpen={showChangePassword}
                onRequestClose={closeChangePassword}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 95,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10
                    },
                    content: {
                        // position: 'relative',
                        maxWidth: '400px',
                        maxHeight:"450px",
                        margin: '0 auto',
                        border: '1px solid #fd4fc1',
                        background: '#000000',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        overflowY:"auto",
                        outline: 'none',
                        padding: '20px',
                        inset: '0'
                    }
                }}
            >
                <div className="change_exit_box" style={{justifyContent:"flex-end"}}>
                    <i className="fa-solid fa-xmark" style={{color:"rgba(255,255,255,0.6)", 
                       fontSize:"30px", cursor:"pointer"}} onClick={closeChangePassword}></i>
                </div>
                <div className="change_header_box">
                    <img src={mainLogo} className="change_main_logo"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="change_password_input_box">
                        <input type="email" className="changepassword_input" placeholder="Email" 
                            onChange={(e)=>setEmail(e.target.value)} value={email} name="email"/>
                    </div>
                    <div className="change_password_input_box">
                        <i className="fa fa-eye" style={{fontSize:"16px", position:"absolute", right:"10px",top:"20px", cursor:"pointer"}}
                            onClick={()=>setShowCurrentPassword(!showCurrentPassword)}>
                        </i>
                       <input type={showCurrentPassword?"text":"password"} className="changepassword_input" 
                                placeholder="Current Password" value={currentPassword}  onChange={(e)=>setCurrentPassword(e.target.value)}/>
                    </div>
                    <div className="change_password_input_box">
                        <i className="fa fa-eye" style={{fontSize:"16px", position:"absolute", right:"10px",top:"20px", cursor:"pointer"}}
                        onClick={()=>setShowNewPassword(!showNewPassword)}></i>
                        <input type={showNewPassword?"text":"password"} className="changepassword_input" placeholder="New Password"
                            onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
                    </div>
                    <div className="change_password_input_box">
                        <i className="fa fa-eye" style={{fontSize:"16px", position:"absolute", right:"10px",top:"20px", cursor:"pointer"}}
                            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}></i>
                        <input type={showConfirmPassword?"text":"password"} className="changepassword_input" 
                            placeholder="Confirm New Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    {
                        passwordError?<p className="error_password">
                            <i className="fa-solid fa-xmark" style={{color:"red", fontSize:"16px", margin:"0 10px 0 0"}}></i>
                            Passwords do not match</p>:changeError?
                            <p className="error_password">
                              <i className="fa-solid fa-xmark" style={{color:"red", fontSize:"16px", margin:"0 10px 0 0"}}></i>
                              Invalid email our password</p>
                            :null
                    }
                    
                    <input type="submit" value="Change" className="changepassword_input submit_change_button"/>
                </form>
            </ReactModal>
            :
            <ReactModal 
                isOpen={success}
                onRequestClose={closeChangeSuccess}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 95,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10
                    },
                    content: {
                        // position: 'relative',
                        maxWidth: `${400}px`,
                        margin: '0 auto',
                        maxHeight:"300px",
                        border: '1px solid #fd4fc1',
                        background: '#000000',
                        WebkitOverflowScrolling: 'touch',
                        overflowY:"auto",
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '0 20px',
                        inset: '0',

                    }
                }}>
                <div className="success_registr_exit_box">
                    <i className="fa-solid fa-xmark"  
                        style={{color:"rgba(255,255,255,0.5)", 
                        fontSize:"25px", cursor:"pointer"}}
                        onClick={closeChangeSuccess}></i>
                </div>
                <img src={smile} className="success_modal_image"/>
                <h3 className="success_modal_head">Your Password is Changed Successfully.</h3>
            </ReactModal>
          }
        </>
    )
}

export default ChangePassword