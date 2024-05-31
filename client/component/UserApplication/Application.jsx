import {React, useState} from 'react'
import './application.css'
import axios from "axios"
import { Button, Input, Select, Form, Radio, Checkbox, message } from "antd";

const Application = ({ hideAppModal }) => {
  const { TextArea } = Input;
  const [category, setCategory] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [connectiontype, setConnectiontype] = useState("");
  const [negrefno, setNegrefno] = useState("");
  const [applicantstatus, setApplicantstatus] = useState("");
  const [applicantname, setApplicantname] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [mob1, setMob1] = useState("");
  const [mob2, setMob2] = useState("");
  const [installedmet, setInstalledmet] = useState("");
  const [load, setLoad] = useState("");
  const [premaddress, setPremaddress] = useState("");
  const [propertycop, setPropertycop] = useState("");
  const [cniccop, setCniccop] = useState("");
  const [witcnic, setWitcnic] = useState("");
  const [negbill, setNegbill] = useState("");
  const [testreport, setTestreport] = useState("");

  const handleSubmit = () => {

     if (
       !category ||
       !subdivision ||
       !connectiontype ||
       !negrefno ||
       !applicantstatus ||
       !applicantname ||
       !citizenship ||
       !cnic ||
       !address ||
       !mob1 ||
       !mob2 ||
       !installedmet ||
       !load ||
       !premaddress ||
       !propertycop ||
       !cniccop ||
       !witcnic ||
       !negbill ||
       !testreport
     ) {
       message.warning("Please fill out all fields before submitting!");
       return;
     }


    const formData = new FormData();

    formData.append("category", category);
    formData.append("subdivision", subdivision);
    formData.append("connectiontype", connectiontype);
    formData.append("negrefno", negrefno);
    formData.append("applicantstatus", applicantstatus);
    formData.append("applicantname", applicantname);
    formData.append("citizenship", citizenship);
    formData.append("cnic", cnic);
    formData.append("address", address);
    formData.append("mob1", mob1);
    formData.append("mob2", mob2);
    formData.append("installedmet", installedmet);
    formData.append("load", load);
    formData.append("premaddress", premaddress);
    formData.append("propertycop", propertycop);
    formData.append("cniccop", cniccop);
    formData.append("witcnic", witcnic);
    formData.append("negbill", negbill);
    formData.append("testreport", testreport);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        "https://vercel.com/muhammad-shahzads-projects-6168eaac/final-year-project/application/subapli",
        formData,
        config
      )
      .then((response) => {
        message.success("Successfully Submitted!");
        hideAppModal();
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <>
      <div className="application_container">
        <div className="application_form">
          <h6>Subdivsion Information</h6>
          <form action="" id="form1">
            <div>
              <label htmlFor="">Category Type</label>
              <br />

              <Form.Item>
                <Select
                  name="category"
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  <Select.Option value="Select Category Type">
                    Select Category Type
                  </Select.Option>
                  <Select.Option value="Load (up to 15KW)">
                    Load (up to 15KW)
                  </Select.Option>
                  <Select.Option value="Load (above 15kW but not exceeding 70kW)">
                    Load (above 15kW but not exceeding 70kW)
                  </Select.Option>
                  <Select.Option value="Load (above 70kW but not exceeding 500kW)">
                    Load (above 70kW but not exceeding 500kW)
                  </Select.Option>
                  <Select.Option value="Load (above 500kW but not exceeding 5000kW)">
                    Load (above 500kW but not exceeding 5000kW)
                  </Select.Option>
                  <Select.Option value="All loads at 66kV and above">
                    All loads at 66kV and above
                  </Select.Option>
                </Select>
              </Form.Item>

              <label htmlFor="">Sub Division</label>

              <Form.Item>
                <Select
                  name="subdivision"
                  value={subdivision}
                  onChange={(value) => {
                    setSubdivision(value);
                  }}
                >
                  <Select.Option value="Select Subdivisions" selected="">
                    Select Subdivisions
                  </Select.Option>
                  <Select.Option value="12111">
                    12111-GRW MODEL TOWN
                  </Select.Option>
                  <Select.Option value="12112">
                    12112-GARJAKHI GATE
                  </Select.Option>
                  <Select.Option value="12113">
                    12113-BAGHBAN PURA
                  </Select.Option>
                  <Select.Option value="12114">
                    12114-GUJRANWALA CITY
                  </Select.Option>
                  <Select.Option value="12115">12115-FAROOQ GUNJ</Select.Option>
                  <Select.Option value="12121">
                    12121-GRW CIVIL LINES
                  </Select.Option>
                  <Select.Option value="12122">12122-SHERAN WALA</Select.Option>
                  <Select.Option value="12123">
                    12123-TALWANDI MUSA KHAN
                  </Select.Option>
                  <Select.Option value="12124">
                    12124-WAHDAT COLONY
                  </Select.Option>
                  <Select.Option value="12125">12125-G.T ROAD</Select.Option>
                  <Select.Option value="12126">12126-CHAMAN SHAH</Select.Option>
                  <Select.Option value="12131">
                    12131-QILA DIDAR SINGH
                  </Select.Option>
                  <Select.Option value="12132">12132-LADHE WALA</Select.Option>
                  <Select.Option value="12133">12133-KHIALI</Select.Option>
                  <Select.Option value="12134">12134-EMIN ABAD</Select.Option>
                  <Select.Option value="12136">
                    12136-CHAND-DA-QILA
                  </Select.Option>
                  <Select.Option value="12141">12141-KAMOKE-I</Select.Option>
                  <Select.Option value="12142">12142-KAMOKE-II</Select.Option>
                  <Select.Option value="12143">12143-KAMOKE-III</Select.Option>
                  <Select.Option value="12146">12146-WAHANDO</Select.Option>
                  <Select.Option value="12151">
                    12151-NAUSHERA VIRKAN-1
                  </Select.Option>
                  <Select.Option value="12152">
                    12152-NAUSHERA VIRKAN-2
                  </Select.Option>
                  <Select.Option value="12153">12153-TATLEY AALI</Select.Option>
                  <Select.Option value="12154">12154-NOKHAR</Select.Option>
                  <Select.Option value="12211">
                    12211-GUJRANWALA CANTT.
                  </Select.Option>
                  <Select.Option value="12212">12212-AROOP</Select.Option>
                  <Select.Option value="12213">12213-FREED TOWN</Select.Option>
                  <Select.Option value="12214">
                    12214-SHAHEEN ABAD
                  </Select.Option>
                  <Select.Option value="12221">12221-DASKA-I</Select.Option>
                  <Select.Option value="12222">12222-DASKA-II</Select.Option>
                  <Select.Option value="12223">12223-DASKA-III</Select.Option>
                  <Select.Option value="12224">12224-DASKA-NO.4</Select.Option>
                  <Select.Option value="12227">
                    12227-GUJRANWALA ROAD
                  </Select.Option>
                  <Select.Option value="12231">
                    12231-WAZIR ABAD-I
                  </Select.Option>
                  <Select.Option value="12232">
                    12232-WAZIR ABAD-II
                  </Select.Option>
                  <Select.Option value="12233">12233-GHAKHAR</Select.Option>
                  <Select.Option value="12234">12234-AHMAD NAGAR</Select.Option>
                  <Select.Option value="12235">12235-NIZAM ABAD</Select.Option>
                  <Select.Option value="12236">
                    12236-ALI PUR CHATHHA
                  </Select.Option>
                  <Select.Option value="12241">
                    12241-HAFIZ ABAD-1
                  </Select.Option>
                  <Select.Option value="12245">
                    12245-HAFIZ ABAD-2
                  </Select.Option>
                  <Select.Option value="12246">
                    12246-HAFIZ ABAD-3
                  </Select.Option>
                  <Select.Option value="12247">
                    12247-HAFIZ ABAD-4
                  </Select.Option>
                  <Select.Option value="12251">
                    12251-JALALPUR BHATTIAN
                  </Select.Option>
                  <Select.Option value="12252">
                    12252-PINDI BHATIAN
                  </Select.Option>
                  <Select.Option value="12253">12253-SUKHE KE</Select.Option>
                  <Select.Option value="12254">
                    12254-VANIKEY TARAR
                  </Select.Option>
                  <Select.Option value="12255">
                    12255-Kaleke Mandi
                  </Select.Option>
                  <Select.Option value="12311">
                    12311-GUJRAT P/HOUSE
                  </Select.Option>
                  <Select.Option value="12312">
                    12312-GUJRAT S.I ESTATE
                  </Select.Option>
                  <Select.Option value="12313">
                    12313-AZIZ BHATTI SHAHID
                  </Select.Option>
                  <Select.Option value="12314">
                    12314-AKRAM SHAHEED
                  </Select.Option>
                  <Select.Option value="12315">12315-MARGHAZAR</Select.Option>
                  <Select.Option value="12321">
                    12321-LALAMUSA CITY
                  </Select.Option>
                  <Select.Option value="12322">
                    12322-LALAMUSA RURAL
                  </Select.Option>
                  <Select.Option value="12323">
                    12323-GUJRAT RURAL
                  </Select.Option>
                  <Select.Option value="12324">12324-KUNJAH</Select.Option>
                  <Select.Option value="12325">12325-SHADIWAL</Select.Option>
                  <Select.Option value="12331">
                    12331-M.BAHAUDIN URBAN
                  </Select.Option>
                  <Select.Option value="12332">
                    12332-M.BAHAUDIN RURAL
                  </Select.Option>
                  <Select.Option value="12335">12335-MALIKWAL</Select.Option>
                  <Select.Option value="12336">12336-LALA ZAR</Select.Option>
                  <Select.Option value="12337">
                    12337-SHAHANA LOKE
                  </Select.Option>
                  <Select.Option value="12338">
                    12338-MALIKWAL RURAL
                  </Select.Option>
                  <Select.Option value="12341">
                    12341-JALALPUR CITY
                  </Select.Option>
                  <Select.Option value="12342">
                    12342-JALAPUR RURAL
                  </Select.Option>
                  <Select.Option value="12343">12343-FATEHPUR</Select.Option>
                  <Select.Option value="12344">12344-KARIANWALA</Select.Option>
                  <Select.Option value="12345">12345-TANDA</Select.Option>
                  <Select.Option value="12351">12351-PHALIA</Select.Option>
                  <Select.Option value="12352">12352-PAHRIANWALI</Select.Option>
                  <Select.Option value="12353">
                    12353-KUTHIALA SHEIKHAN
                  </Select.Option>
                  <Select.Option value="12354">12354-GOJRA</Select.Option>
                  <Select.Option value="12355">12355-MANO CHAK</Select.Option>
                  <Select.Option value="12356">12356-RERKA BALA</Select.Option>
                  <Select.Option value="12361">12361-KHARIAN-I</Select.Option>
                  <Select.Option value="12362">12362-KHARIAN-II</Select.Option>
                  <Select.Option value="12363">12363-GULIANA</Select.Option>
                  <Select.Option value="12364">12364-KOTLA-I</Select.Option>
                  <Select.Option value="12365">12365-DINGA-I</Select.Option>
                  <Select.Option value="12366">12366-DINGA-II</Select.Option>
                  <Select.Option value="12367">12367-KOTLA-II</Select.Option>
                  <Select.Option value="12411">12411-POWER HOUSE</Select.Option>
                  <Select.Option value="12412">12412-FORT</Select.Option>
                  <Select.Option value="12413">12413-MODEL TOWN</Select.Option>
                  <Select.Option value="12414">12414-CIVIL LINES</Select.Option>
                  <Select.Option value="12415">12415-NEIKA PURA</Select.Option>
                  <Select.Option value="12422">12422-GHUINKI</Select.Option>
                  <Select.Option value="12423">12423-AKBARABAD</Select.Option>
                  <Select.Option value="12424">12424-PASRUR ROAD</Select.Option>
                  <Select.Option value="12425">
                    12425-ZAFARWAL ROAD
                  </Select.Option>
                  <Select.Option value="12432">
                    12432-RANG PUR SKT
                  </Select.Option>
                  <Select.Option value="12433">12433-CANTT.</Select.Option>
                  <Select.Option value="12434">
                    12434-DALOWALI SIALKOT.
                  </Select.Option>
                  <Select.Option value="12435">12435-SAID PUR</Select.Option>
                  <Select.Option value="12436">
                    12436-KOTLI LOHARAN
                  </Select.Option>
                  <Select.Option value="12437">12437-HEAD MARALA</Select.Option>
                  <Select.Option value="12441">12441-PASRUR-1</Select.Option>
                  <Select.Option value="12442">12442-PASRUR-2</Select.Option>
                  <Select.Option value="12443">12443-PASRUR-3</Select.Option>
                  <Select.Option value="12444">12444-CHAWINDA</Select.Option>
                  <Select.Option value="12445">12445-CHOBARA</Select.Option>
                  <Select.Option value="12446">12446-SATRAH</Select.Option>
                  <Select.Option value="12471">12471-GOHAD PUR</Select.Option>
                  <Select.Option value="12472">
                    12472-DEFENCE ROAD
                  </Select.Option>
                  <Select.Option value="12473">12473-SAMBRIAL</Select.Option>
                  <Select.Option value="12474">12474-BHOPAL WALA</Select.Option>
                  <Select.Option value="12511">12511-NAROWAL-1</Select.Option>
                  <Select.Option value="12512">12512-NAROWAL-2</Select.Option>
                  <Select.Option value="12513">12513-NAROWAL-3</Select.Option>
                  <Select.Option value="12514">12514-BADDO MALHI</Select.Option>
                  <Select.Option value="12515">
                    12515-QILA KALAR WALA
                  </Select.Option>
                  <Select.Option value="12521">12521-ZAFARWAL-1</Select.Option>
                  <Select.Option value="12522">12522-ZAFARWAL-2</Select.Option>
                  <Select.Option value="12523">12523-ZAFARWAL-3</Select.Option>
                  <Select.Option value="12531">
                    12531-SHAKARGRAH-1
                  </Select.Option>
                  <Select.Option value="12532">
                    12532-SHAKARGRAH-2
                  </Select.Option>
                  <Select.Option value="12533">
                    12533-SHAKARGRAH-3
                  </Select.Option>
                  <Select.Option value="12534">
                    12534-SHAKARGRAH-4
                  </Select.Option>
                  <Select.Option value="12611">
                    12611-M.B.Din Urban
                  </Select.Option>
                  <Select.Option value="12612">
                    12612-M.B.Din Rural
                  </Select.Option>
                  <Select.Option value="12613">12613-Lalazar</Select.Option>
                  <Select.Option value="12614">
                    12614-Shahana Loke
                  </Select.Option>
                  <Select.Option value="12615">
                    12615-Malakwal Urban
                  </Select.Option>
                  <Select.Option value="12616">
                    12616-Malakwal Rural
                  </Select.Option>
                  <Select.Option value="12621">12621-Phalia</Select.Option>
                  <Select.Option value="12622">12622-Pahrianwall</Select.Option>
                  <Select.Option value="12623">12623-k/shiekhan</Select.Option>
                  <Select.Option value="12624">12624-Mano Chak</Select.Option>
                  <Select.Option value="12625">12625-Gojra</Select.Option>
                  <Select.Option value="12626">12626-Rerka Bala</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">Connection Type</label>

              <Form.Item>
                <Select
                  name="connectiontype"
                  value={connectiontype}
                  onChange={(value) => {
                    setConnectiontype(value);
                  }}
                >
                  <Select.Option value="Select Connection Type">
                    Select Connection Type
                  </Select.Option>
                  <Select.Option value="Domestic">Domestic</Select.Option>
                  <Select.Option value="Commerical">Commerical</Select.Option>
                  <Select.Option value="Industrail">Industrail</Select.Option>
                  <Select.Option value="Agriculture">Agriculture</Select.Option>
                  <Select.Option value="Tubewell">Tubewell</Select.Option>
                  <Select.Option value="Temporary">Temporary</Select.Option>
                  <Select.Option value="General Services">
                    General Services
                  </Select.Option>
                  <Select.Option value="Electrification (Colonies)">
                    Electrification (Colonies)
                  </Select.Option>
                  <Select.Option value="Street Light">
                    Street Light
                  </Select.Option>
                  <Select.Option value="Corporate Company">
                    Corporate Company
                  </Select.Option>
                </Select>
                <label htmlFor="" style={{ marginTop: "2vw" }}>
                  Reference Number of Neighbour
                </label>
                <Input
                  type="text"
                  id="neg_ref"
                  name="negrefno"
                  onChange={(e) => {
                    setNegrefno(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
          </form>

          <h6>Applicant's Particulars</h6>
          <form action="" id="page2_form">
            <div className="first_form_part">
              <label htmlFor="">Applicant Status</label>
              <br />

              <Select
                id="radio-btn"
                value={applicantstatus}
                onChange={(value) => {
                  setApplicantstatus(value);
                }}
              >
                <Select.Option value="Landlord/Owner">
                  Landlord/Owner
                </Select.Option>
                <Select.Option value="Tenant(Rental)">
                  Tenant(Rental)
                </Select.Option>
              </Select>

              <br />
              <br />

              <label htmlFor="">Applicant Name</label>
              <br />

              <Input
                type="text"
                id="app-name"
                placeholder="Enter your name"
                name="applicantname"
                onChange={(e) => {
                  setApplicantname(e.target.value);
                }}
              />
              <br />
              <br />

              <label htmlFor="">Citizenship</label>
              <br />
              <Select
                value={citizenship}
                onChange={(value) => {
                  setCitizenship(value);
                }}
              >
                <Select.Option value="Pakistani">Pakistani</Select.Option>
                <Select.Option value="Foreigner">Foreigner</Select.Option>
              </Select>

              <br />
              <br />
              <label htmlFor="">CNIC/NIC</label>
              <br />
              <Input
                type="text"
                placeholder="Enter your CNIC/NIC"
                id="app-cnic"
                name="cnic"
                onChange={(e) => {
                  setCnic(e.target.value);
                }}
              />
              <br />
              <br />
            </div>

            <div>
              <label htmlFor="">Present Address</label>
              <br />
              <Input
                type="text"
                placeholder="Enter present address"
                id="app-address"
                name="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <br />
              <br />

              <label htmlFor="">Mobile No1</label>
              <br />
              <Input
                type="text"
                placeholder="Enter mobile No1"
                id="app-mob1"
                name="mob1"
                onChange={(e) => {
                  setMob1(e.target.value);
                }}
              />
              <br />
              <br />

              <label htmlFor="">Mobile No2</label>
              <br />

              <Input
                type="text"
                placeholder="Enter mobile No2"
                id="app-mob2"
                name="mob2"
                onChange={(e) => {
                  setMob2(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <form action="" id="page-4">
          <div style={{ marginTop: "1vw" }}>
            <h6>Premises Detail</h6>
            <label htmlFor="">No. of meter already Installed</label>

            <Form.Item>
              <Select
                value={installedmet}
                onChange={(value) => {
                  setInstalledmet(value);
                }}
              >
                <Select.Option value="">Select Meter</Select.Option>
                <Select.Option value="0">0</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
              </Select>
            </Form.Item>

            <label htmlFor="">Minimum Load (KWh)</label>

            <Form.Item>
              <Select
                value={load}
                id="meter-selection"
                onChange={(value) => {
                  setLoad(value);
                }}
              >
                <Select.Option value="">Select Load</Select.Option>
                <Select.Option value="0">0</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
              </Select>
            </Form.Item>
            <label htmlFor="">Premises Address</label>
            <br />
            <TextArea
              name="premaddress"
              id="app-textarea"
              placeholder="Enter Premises Address"
              onChange={(e) => {
                setPremaddress(e.target.value);
              }}
            ></TextArea>
            <br />
          </div>

          <div style={{ marginTop: "1vw" }}>
            <h6>Attachments (Only Images)</h6>
            <label htmlFor="">Property Document Copy</label>
            <br />

            <Input
              type="file"
              name="propertycop"
              onChange={(e) => {
                setPropertycop(e.target.files[0]);
              }}
            />

            <br />
            <br />
            <label htmlFor="">Attested CNIC Copy of Applicant</label>
            <br />

            <Input
              type="file"
              name="cniccop"
              onChange={(e) => {
                setCniccop(e.target.files[0]);
              }}
            />
            <br />
            <br />
            <label htmlFor="">Attested CNIC Copy of Witness</label>
            <br />

            <Input
              type="file"
              name="witcnic"
              onChange={(e) => {
                setWitcnic(e.target.files[0]);
              }}
            />
            <br />
            <br />
            <label htmlFor="">Neighbour Electricity Bill Copy</label>
            <br />

            <Input
              type="file"
              name="negbill"
              onChange={(e) => {
                setNegbill(e.target.files[0]);
              }}
            />
            <br />
            <br />
            <label htmlFor="">Wiring Contractor`s Test Report</label>
            <br />

            <Input
              type="file"
              name="testreport"
              onChange={(e) => {
                setTestreport(e.target.files[0]);
              }}
            />
            <br />
            <br />
          </div>
        </form>
      </div>
      <div>
        <div className="terms">
          <Checkbox>
            <a>Terms and Conditions</a>
          </Checkbox>
          <br />
          <Button
            type="primary"
            id="next-btn"
            onClick={handleSubmit}
            style={{
              marginTop: "2vw",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              marginLeft: "12vw",
            }}
          >
            Submit
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default Application
