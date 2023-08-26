/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import veg1 from './images/veg1.jpg'
import veg2 from './images/veg2.jpg'
import veg3 from './images/veg3.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent= () => {
  return (
    <Carousel showArrows={true} autoPlay showThumbs={false} infiniteLoop={true}>
                <div>
                    <Image src={veg1} 
                    width={500}
                    height={500}
                    alt='image'/>
                    <p className="legend">Buy Vegetable 50% off</p>
                </div>
                <div>
                    <Image src={veg2} 
                    width={500}
                    height={500}
                    alt='image' />
                    <p className="legend">New Features Comming Soon</p>
                </div>
                <div>
                    <Image src={veg3} 
                    width={500}
                    height={500}
                    alt='image' />
                    <p className="legend">Buy 1 Get 1</p>
                </div>
            </Carousel>
  )
}

export default CarouselComponent;