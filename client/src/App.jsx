import { React, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./component/About/About";
import Payment from "./component/BillPayment/Payment";
import Bill from "./component/GetBill/Bill";
import Home from "./component/Home/Home";
import Knowbill from "./component/KnowBill/Knowbill";
import Login from "./component/Login/Login";
import MobileReg from "./component/MobileReg/MobileReg";
import Signup from "./component/Signup/Signup";
import Application from "./component/UserApplication/Application";
import Complaint from "./component/UserComplaint/Complaint";
import ViewComplaints from "./component/UserComplaint/ViewComplaints";
import Dashboard from "./component/UserDashboard/Dashboard";
import UserContext from "./component/Usercontext/Usercontext";
import Admin from "./component/Admin/Admin";
import Profile from "./component/Profile/Profile";
import GetUsers from "./component/AdminUsers/GetUsers";
import AdComplaint from "./component/AdminComplaint/AdComplaint";
import AdApplication from "./component/AdminApp/AdApplication";
import BillDeatils from "./component/BillDetails/BillDeatils";
import UserResponse from "./UserResponse/UserResponse";
import Policy from "./component/Policies/Policy";
import Sucess from "./component/BillPayment/Sucess";
import Tariff from "./component/Tariff/Tariff";
import FAQ from "./component/FAQ/FAQ";
import PostJob from "./component/JobPosting/PostJob";
import ViewJob from "./component/JobPosting/ViewJobs";
import { ChakraProvider } from "@chakra-ui/react";
import Uploadbill from "./component/AdminUpload/Uploadbill";
import Seniority from "./component/Policies/Seniority";
import Accomdation from "./component/Policies/Accomdation";
import Pension from "./component/Policies/Pension";
import Theft from "./component/TheftDetection/Theft";
import Technical from "./component/Departments/Technical";
import Job from "./component/JobPosting/Job";
import ViewApp from "./component/JobPosting/ViewApp";
import Operations from "./component/Departments/Operations";
import Finance from "./component/Departments/Finance";
import PMU from "./component/Departments/PMU";
import Material from "./component/Departments/Material";
import SuperAdmin from "./component/SuperAdmin/SuperAdmin";
import ViewAdmins from "./component/SuperAdmin/ViewAdmins";
import SuperLogin from "./component/SuperAdmin/SuperLogin";
import ViewUsers from "./component/SuperAdmin/ViewUsers";
import AdminLogin from "./component/Admin/AdminLogin";
import Cancel from "./component/BillPayment/Cancel";

function App() {
  const [userName, setUserName] = useState("");
  const [refno, setRefnoo] = useState("");
  const [email, setEmails] = useState("");
  const [billData, setBilldata] = useState([]);
  const [area, setArea] = useState("");
  const [responsemsg, setResponseMsg] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [responsetimestamp, setResponsetimestamp] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isadminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [complaintResponses, setComplaintResponses] = useState("");

  return (
    <ChakraProvider>
      <UserContext.Provider
        value={{
          userName,
          setUserName,
          email,
          setEmails,
          refno,
          setRefnoo,
          billData,
          setBilldata,
          area,
          setArea,
          responsemsg,
          setResponseMsg,
          responsetimestamp,
          setResponsetimestamp,
          complaint,
          setComplaint,
          complaintResponses,
          setComplaintResponses,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/knowbill" element={<Knowbill />} />
          <Route path="/mobilereg" element={<MobileReg />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getbill" element={<Bill />} />
          <Route path="/application" element={<Application />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/viewcomplaint" element={<ViewComplaints />} />

          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/getusers" element={<GetUsers />} /> */}
          {/* <Route path="/admincomplaint" element={<AdComplaint />} />
          <Route path="/adminapplication" element={<AdApplication />} />
          <Route path="/billdetails" element={<BillDeatils />} /> */}
          <Route path="/userresp" element={<UserResponse />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/success" element={<Sucess isPaid={isPaid} />} />
          <Route path="/tariff" element={<Tariff />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/seniority" element={<Seniority />} />
          <Route path="/accomd" element={<Accomdation />} />
          <Route path="/pension" element={<Pension />} />
          <Route path="/theft" element={<Theft />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/pmu" element={<PMU />} />
          <Route path="/material" element={<Material />} />
          <Route path='/cancel' element={<Cancel/>}/>
          <Route
            path="/admin"
            element={
              isadminLoggedIn ? (
                <Navigate to="/uploadbill" />
              ) : (
                <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
              )
            }
          />
          <Route
            path="/getusers"
            element={isadminLoggedIn ? <GetUsers /> : <Navigate to="/admin" />}
          />
          <Route
            path="/admincomplaint"
            element={
              isadminLoggedIn ? <AdComplaint /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/adminapplication"
            element={
              isadminLoggedIn ? <AdApplication /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/billdetails"
            element={
              isadminLoggedIn ? <BillDeatils /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/postjobs"
            element={isadminLoggedIn ? <PostJob /> : <Navigate to="/admin" />}
          />
          <Route
            path="/viewjobs"
            element={isadminLoggedIn ? <ViewJob /> : <Navigate to="/admin" />}
          />
          {/* <Route
            path="/viewcomplaint"
            element={
              isadminLoggedIn ? <ViewComplaints /> : <Navigate to="/admin" />
            }
          /> */}
          <Route
            path="/uploadbill"
            element={
              isadminLoggedIn ? <Uploadbill /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/viewapp"
            element={isadminLoggedIn ? <ViewApp /> : <Navigate to="/admin" />}
          />

          <Route
            path="/superadmin"
            element={
              isLoggedIn ? (
                <Navigate to="/superdashboard" replace />
              ) : (
                <SuperLogin setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/superdashboard"
            element={
              isLoggedIn ? (
                <SuperAdmin />
              ) : (
                <Navigate to="/superadmin" replace />
              )
            }
          />
          <Route
            path="/viewadmin"
            element={
              isLoggedIn ? (
                <ViewAdmins />
              ) : (
                <Navigate to="/superadmin" replace />
              )
            }
          />

          <Route
            path="/viewusers"
            element={
              isLoggedIn ? <ViewUsers /> : <Navigate to="/superadmin" replace />
            }
          />
        </Routes>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
