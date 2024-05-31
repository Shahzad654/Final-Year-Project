import React from "react";
import Footer from "../Footer/Footer";
import Navbarr from "../Navbar/Navbarr";

const Material = () => {
  return (
    <>
      <Navbarr />
      <div>
        <h3 style={{ marginTop: "8vw", marginLeft: "3vw" }}>
          Material Management Department
        </h3>
        <p style={{ marginLeft: "3vw", marginRight: "2vw" }}>
          The house of force that behind our filed forces. For around the clock
          connectivity of electricity to our esteems customers and for the
          safety of our valuable technical operational staff the in time supply
          of equipment is the core responsibility of the department.
        </p>
        <p style={{ marginLeft: "3vw", marginRight: "2vw" }}>
          The department under the headship of Addl. Director General performs
          the following tasks:
        </p>
        <ul style={{ marginLeft: "3vw", marginTop: "5vw" }}>
          <li>
            Prequalification and Registration of firms for supply of
            distribution / GSO Material
          </li>
          <li>Procurement of material through tender</li>
          <li>
            Disposal of unserviceable material / vehicles through tender and
            auction
          </li>
          <li>
            Formation of rate contract for regular supply of material with firms
          </li>
          <li>
            Maintaining of minimum and maximum level of material in stores
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Material;
