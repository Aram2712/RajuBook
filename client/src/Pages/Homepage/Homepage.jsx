import React, {useState,useEffect} from 'react';
import CarouselComponent from '../../Components/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CasinoGames from '../../Components/section/casinogames';
import FriendlyBook from '../../Components/section/friendlybook';
import GetId from '../../Components/section/getid';
import CustomerSupport from '../../Components/section/customersupport';
import GamesPlay from '../../Components/section/gamesplay';
import ClientsCard from '../../Components/section/clientscard';
import Footer from '../../Components/footer';
import ScrollToTop from '../../Components/scrolltotop/ScrollToTop';
import * as constants from "../../constants.js";
import whatsapp from '../../Images/whatsapp.gif';
import FirstDepositWindow from '../DepositPage/firstDepositWindow/firstDepositWindow';
import styles from './homepage.module.css';
import {useGlobalContext} from "../../context";



const Home = () => {
    const email=localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).email : null
    const [url, setUrl]=useState(window.location.href);
    const [transId, setTransId]=useState("");
    useEffect(()=>{
      let x=url.indexOf("=");
      if(x){
        setTransId(url.slice(x+1));
        fetch(`${constants.baseURL}/get_payment_status`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,transactionId:transId})
        })
        .then(response=>response.json())
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
      }
    },[transId])
  
  return (
    <main className={styles.mainHome}>
      <CarouselComponent className={styles.carousel} />
      <CasinoGames />
      <FriendlyBook />
      <GetId />
      <CustomerSupport />
      <GamesPlay />
      <ClientsCard />
      <Footer />
      <ScrollToTop />
      <FirstDepositWindow/>
      <a href={"https://wa.me/919916987654"} className={styles.whatsapp_link}><img className={styles.whatsapplogo} src = {whatsapp}/></a>

    </main>
  )
}

export default Home