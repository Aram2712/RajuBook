import React, {useState, useEffect} from "react";
import './App.css';
import Navbar from "./Components/Navbar";
import { BrowserRouter,HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/Homepage/Homepage";
import SignIn from "./Components/Authorization/SignIn/Signin";
import SignUp from "./Components/Authorization/SignUp/Signup";
import DepositPage from "./Pages/DepositPage";
import * as constants  from "./constants";

function App() {
    const [path, setPath]=useState(window.location.href);
    const [balance, setBalance]=useState("");


  return(
    <HashRouter>
      <Navbar balance={balance}/>
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path = "/deposit" element = {<DepositPage/>}/> 
        </Routes>
     <SignIn/>
     <SignUp/>
    </HashRouter>
  )
}

export default App