import React from 'react'
import Footer from '../Footer/Footer'
import Navbarr from '../Navbar/Navbarr'

const PMU = () => {
  return (
    <>
      <Navbarr />
      <div>
        <h3 style={{ marginTop: "8vw", marginLeft: "3vw" }}>
          Project Management Unit PMU
        </h3>
        <p style={{ marginLeft: "3vw", marginRight: "2vw" }}>
          The house of future planners, GEPCO Project Management Unit under
          Chief Engineer Development, works to ensure implementation of all
          Development Works to be executed under Investment Programs of Donor
          Agencies and GEPCO undertaking activities related to Planning,
          Scheduling, Procurement, Safeguard & Finance. The main key leaders are
          Manager Planning & Scheduling, Manager Procurement & Manager Finance.
        </p>
        <ul style={{marginLeft:'3vw', marginTop:'5vw'}}>
          <li>
            To ensure that all land acquisition activities are carried out and
            completed.
          </li>
          <li>
            To deal with and report on all Procurement related matters and
            obtain approval from CEO and Board of Directors, if required.
          </li>
          <li>
            To deal with and report on all Safeguard related matters and obtain
            approval from CEO.
          </li>
          <li>
            To deal with and report on Finance and Disbursement related matters.
          </li>
          <li>
            To take care of all responsibilities and tasks related to
            Environment, land and social safeguards.
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default PMU
