import React from 'react'
import './footer.css'
import FooterImg from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {CiMail} from 'react-icons/ci'
import {BiPhoneCall} from 'react-icons/bi'
import { FloatButton } from "antd";

const Footer = () => {
  return (
    <>
      <div className="footer_container">
        <div className="left_section">
          <div>
            <div className="social_section">
              <h3>Follow Us</h3>
              <div className="icons">
                <Link to="https://www.facebook.com/Ceogepco" target="_blank">
                  <BsFacebook className="fb" />
                </Link>
                <Link to="https://www.twitter.com/Ceogepco" target="_blank">
                  <BsTwitter className="X" />
                </Link>

                <BsInstagram className="ins" />
              </div>
            </div>

            <div className="copyright">
              <p>2024 GEPCO. All Rights Reserved.</p>
            </div>
          </div>
        </div>

        <div className="middle_section">
          <h3>Contact Us</h3>
          <div className="contact_info">
            <GoLocation className="location" />
            <p>Gujranwala, Pakistan</p>

            <CiMail className="mail" />
            <p>gepco@gmail.com</p>

            <BiPhoneCall className="call" />
            <p>+92314232390</p>
          </div>
        </div>

        <div className="right_section">
          <h3>Main Menu</h3>

          <ul className="footer_list">
            <Link to="/about" id="aboutus">
              <li>About Us</li>
            </Link>
            <li>Career</li>
            <Link to="/faq" style={{ textDecoration: "none" }}>
              <li>FAQ's</li>
            </Link>
          </ul>
          <FloatButton.BackTop
          id='backtotop'
          />
        </div>

      </div>
    </>
  );
}

export default Footer
