import React from 'react';
import clients from "./images/clients1.jpg";
import clients1 from "./images/clients2.jpg";
import clients2 from "./images/clients3.jpg";
import clients3 from "./images/clients4.jpg";
import clients4 from "./images/clients5.jpg";
import styles from "./clientsCard.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ClientsCarousel() {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,

        responsive: [
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: false
                }
            },
            {
                breakpoint: 649,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,

                }
            }
        ]
    };
    return (

        <div className={styles.carouselContainer}>

            <Slider {...settings} >
                <div>
                    <img src={clients} alt={"clients"} className={styles.clientsCarousel}/>
                </div>
                <div>
                    <img src={clients1} alt={"clients"} className={styles.clientsCarousel}/>
                </div>
                <div>
                    <img src={clients2} alt={"clients"} className={styles.clientsCarousel}/>
                </div>
                <div>
                    <img src={clients3} alt={"clients"} className={styles.clientsCarousel}/>
                </div>
                <div>
                    <img src={clients4} alt={"clients"} className={styles.clientsCarousel}/>
                </div>

            </Slider>
        </div>

    );
}

export default ClientsCarousel;
