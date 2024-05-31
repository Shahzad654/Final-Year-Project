import React from 'react'
import './ach.css'
import { IoIosHome } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { FaIndustry } from "react-icons/fa";
import { GiWell } from "react-icons/gi";

const Ach = () => {
  return (
    <>
      <div className="achivements_container">
        
        <div className="flexbanner">
          <div className="home_users">
            <IoIosHome id="home_users_icon" />
            <h3>3961615</h3>
            <p id="doms_cons">Domestic Consumers</p>
          </div>

          <div className="commercial_users">
            <BsBank2 id="commercial_users_icon" />
            <h3 id="coms_head">431430</h3>
            <p>Commercial Consumers</p>
          </div>

          <div className="Industrial_users">
            <FaIndustry id="Industrial_users_icon" />
            <h3>84493</h3>
            <p>Industrial Consumers</p>
          </div>

          <div className="Tubewel_users">
            <GiWell id="Tubewel_users_icon" />
            <h3>57007</h3>
            <p>Tubewel Consumers</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ach