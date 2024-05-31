import React from 'react'
import './slider.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import C1 from '../../assets/c1.png'
import C2 from '../../assets/c2.png'
import C3 from '../../assets/c3.png'

function Slider() {
  return (
    <>

    <div className="slider_container">
        <h3 id='news_heading'>Events & News</h3>

        <div className="slidercss">
        <Carousel data-bs-theme="dark" className='news_events' >
      <Carousel.Item>
        <img 
          id='image1Sl'
          className="d-block w-100"
          src={C1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          id='image2Sl'
          className="d-block w-100"
          src={C2}
          alt="Second slide"
        />
 
      </Carousel.Item>
      <Carousel.Item>
        <img
           id='image3Sl'
          className="d-block w-100"
          src={C3}
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>

        </div>
    </div>
    </>
  )
}

export default Slider;
