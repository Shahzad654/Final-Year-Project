import React from 'react'
import './home.css'
import Hero from '../Hero/Hero'
import MainAb from '../MainAbout/MainAb'
import Slider from '../Slider/Slider'
import Footer from '../Footer/Footer'
import Cards from '../Cards/Cards'
import Ach from '../Achivements/Ach'
import { Card } from "antd";

const Home = () => {
  return (
    <>
      <Hero />
      <Cards />
      <MainAb />
      <Ach />
      <div className="slider_home">
        <div className="slider_div">
          <Slider />
        </div>
        {/* <div className="updates">
          <Card title="Highlights" bordered={false}>
            <ul className='news_events'>
              <li>Political Map of Pakistan</li>
              <li>Tenders</li>
              <li>Shutdowns / PTW</li>
              <li>New Connection Preocedure</li>
            </ul>
          </Card>
        </div> */}
       
      </div>
      <Footer />
    </>
  );
}

export default Home
