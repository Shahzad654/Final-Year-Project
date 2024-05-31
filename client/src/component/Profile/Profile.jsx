import { React, useState, useContext } from "react";
import "./profile.css";
import axios from 'axios'
import UserContext from "../Usercontext/Usercontext";
import { Button, Layout, theme, Input, Modal } from "antd";
const { Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {
  const { userName, refno, email, area } = useContext(UserContext);
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
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="profile_content">
          <label htmlFor="" id="profile-items" style={{ fontWeight: "bold" }}>
            Name
          </label>
          <p>{userName}</p>

          <label htmlFor="" id="profile-items" style={{ fontWeight: "bold" }}>
            Refernce Number
          </label>
          <p>{refno}</p>

          <label htmlFor="" id="profile-items" style={{ fontWeight: "bold" }}>
            Email
          </label>
          <p>{email}</p>
          <Modal
            title="Change Name"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Input
              placeholder="Enter new name"
              onChange={(e) => {
                setChangeName(e.target.value);
              }}
            />
            <br />
            <br />
            <Button type="primary" onClick={() => handleChange(changedata._id)}>
              Confirm
            </Button>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default App;
