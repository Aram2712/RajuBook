import { Carousel } from "react-responsive-carousel";
// import carusel1 from '../../logos-images/carusel-1.svg';
import carusel1 from '../../Images/carusel-1.svg';
import carusel2 from '../../Images/carusel-2.svg';
import carusel3 from '../../Images/Carusel 2.svg';

const CarouselComponent = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}>
            <div>
                <img alt="firstCarusel" src={carusel1} />
            </div>
            <div>
                <img alt="secondCarusel" src={carusel2} />
            </div>
            <div>
                <img alt="thirdCarusel" src={carusel3} />
            </div>
        </Carousel>
    );
}

export default CarouselComponent