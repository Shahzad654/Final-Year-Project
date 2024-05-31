import React from 'react'
import './about.css'
import Navbarr from '../Navbar/Navbarr'
import AboutImg from '../../assets/bgso20.jpg'
import Footer from '../Footer/Footer'
import CareerImg from '../../assets/about.jpg'
import { Button, message, Popconfirm } from "antd";


const About = () => {

  return (
    <>
      <Navbarr />

      <div className="about_container">
        <div className="top_section">
          <div className="left-content">
            <h2 id="t1">Who We Are</h2>
            <h1 id="t2">Overview</h1>
            <p id="tp1">Energy security for a sustainable world</p>
          </div>
          <div className="right-content">
            <img src={AboutImg} alt="" id="aboutimg" />
          </div>
        </div>

        <div className="about-content">
          <p id="p1ab">
            We are one of the world's largest integrated energy and chemicals
            companies, creating value across the hydrocarbon chain, and
            delivering societal and economic benefits to people and communities
            around the globe who rely on the vital energy we supply.{" "}
          </p>

          <p id="p2ab">
            We are committed to playing a leading role in the energy transition.
            We have a responsibility to help the world achieve a net-zero
            economy, and our people are working hard to help solve the world's
            sustainability challenges.
          </p>

          <p id="p3ab">
            For our customers, we are a supplier of choice. For our
            shareholders, we provide long-term value creation. For communities
            around the world, our ambition is to provide reliable, affordable,
            and more sustainable energy.
          </p>
        </div>

        <div className="career_section_about">
          <div className="first_section">
            <img src={CareerImg} alt="" id="career-img" />
            <div className="overlay-about"></div>
            <div className="overlay-content-about">
              <h4 id="ctitle">Careers</h4>
              <h2 id="ctitle2">Join Our Team</h2>
              <p id="cpara">
                Every day, our multi-national team of more than 70,000 people
                combines passion, purpose, and performance to achieve a common
                objective: unlocking the full potential of the Kingdom’s
                resources.
              </p>
                <Button id="find-btn">Find Out More</Button>
             
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About
