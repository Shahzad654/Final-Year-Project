import React, { useState, useContext } from "react";
import {UserOutlined} from "@ant-design/icons";
import { FaRegCircleUser } from "react-icons/fa6";
import UserContext from "../Usercontext/Usercontext";
import {Layout,Modal, theme } from "antd";
import Profile from '../../component/Profile/Profile'
import Logo from "../../assets/logotext2.png";

const { Header } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DashHead = () => {
  const { userName } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="" style={{width:'4.5vw'}} />
          <h6 style={{ paddingLeft: "65vw", paddingTop: "1.1vw" }}>
            {userName}
          </h6>
          <FaRegCircleUser
            onClick={showModal}
            style={{ width: "6vw", height: "2vw", marginLeft: "1.6vw", marginTop: "0.4vw" }}
          />
        </div>
        <Modal
          title="Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Profile />
        </Modal>
      </Header>
    </>
  );
};

export default DashHead;
