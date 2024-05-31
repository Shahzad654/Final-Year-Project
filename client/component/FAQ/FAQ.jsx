import React from 'react'
import Navbarr from '../Navbar/Navbarr'
import Accordion from "react-bootstrap/Accordion";
import Footer from '../Footer/Footer';

const FAQ = () => {
  return (
    <>
      <Navbarr />

      <div style={{ paddingTop: "9vw" }}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What does GEPCO stand for?</Accordion.Header>
            <Accordion.Body>Gujranwala Electric Power Compnay.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              How can the connection be converted into other persons name?
            </Accordion.Header>
            <Accordion.Body>
              The change in name of the connection can be arranged by applying
              for the same to the concerned Sub-Division on the prescribed
              application form to be submitted duly filled in along with the
              required document to substantiate justification for change of
              name. After the applicant has fulfilled all the pre-requisites for
              change of name the connection is changed into the desired new
              name.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>What does WAPDA stands for?</Accordion.Header>
            <Accordion.Body>
              Water and Power Development Authority
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              How can a wrong bill be corrected?
            </Accordion.Header>
            <Accordion.Body>
              In case any bill contains any error the consumer should report to
              the concerned Customer Service Centre/Sub-Division/Revenue Office.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              Where can a consumer deposit the electricity bills?
            </Accordion.Header>
            <Accordion.Body>
              WAPDA has made arrangement with all scheduled Banks of Pakistan
              and the post offices, who have specified their branches in all
              parts of the country to facilitate the consumers for making
              payment of their bills. The consumer can deposit his bill in any
              authorized Bank branch/Post Office within District/ City.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              How can a consumer get his load increased/decreased according to
              his requirement?
            </Accordion.Header>
            <Accordion.Body>
              The consumer will have to apply to the SDO/other competent
              authority who will arrange the verification of the load and test
              report and will arrange the reduction/extension of the load.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              How can a consumer arrange the disconnection of his supply and
              refund of security?
            </Accordion.Header>
            <Accordion.Body>
              The consumer who does not want to continue his electricity
              connection will apply for permanent disconnection to the SDO. The
              connection would be temporarily disconnected by the SDO after
              obtaining clearance from Revenue Office .
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>
              What is GEPCO doing to control excessive supply failures due to
              kite flying with metallic wire?
            </Accordion.Header>
            <Accordion.Body>
              The problem is being tackled on the technical level by covering
              the Grid Stations equipment with guard wires and nets. At the
              administrative and legal level, patrole teams are organized to nab
              the culprits using the metallic wires and handing them over to the
              Police for registering cases against them. However, public support
              is very necessary to curb this practice. GEPCO solicits public
              support by organizing walks, seminars and appeals through
              print/electronic media.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>
              How the dangerous poles or wires hindering the doorway or the
              street can be removed?
            </Accordion.Header>
            <Accordion.Body>
              As the poles/wires were installed before the construction of the
              house or street, give the details in writing to the Executive
              Engineer Operation of your area, who will prepare an estimate of
              the probable cost of removing the pole or wires. This cost has to
              be paid by you for relocation of the pole or wires.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>
              What is the policy and procedure for the electrification of a left
              over locality or a Village?
            </Accordion.Header>
            <Accordion.Body>
              The electrification of villages/localities if financed and
              approved by local or provincial government. Please get in touch
              with your elected representative for the electrification of your
              locality or village. GEPCO will provide a feasibility report. On
              payment of the full cost, the required electrification will be
              undertaken. The cost of electrification of housing schemes is
              similarly borne by the sponsors or residents.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="10">
            <Accordion.Header>
              Why does my new meter run faster than the old meter which has been
              replaced by GEPCO?
            </Accordion.Header>
            <Accordion.Body>
              It is not true. The fact is that the new meter runs correctly. It
              was the old meter which had become slow and sluggish due to age
              and/or other external/internal causes.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="11">
            <Accordion.Header>
              Whom to approach for correction of wrong reading on the bill?
            </Accordion.Header>
            <Accordion.Body>
              Please contact SDO/XEN & Customer Services Centre of your area or
              GEPCO Head Quarter.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Footer/>
    </>
  );
}

export default FAQ
