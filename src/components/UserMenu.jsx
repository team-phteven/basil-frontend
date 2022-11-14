import React, { useState } from 'react'
import { MdOutlineLogout, MdSettings, MdGroup } from "react-icons/md";
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Avatar from "../components/Avatar";
import { useUser } from "../contexts/UserProvider";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'

const UserMenu = ({ menu, setMenu }) => {

    const { localUser } = useUser();

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    const toggleSettings = () => {
        setMenu(menu === "Settings" ? "Conversations" : "Settings");
    };

    const toggleContacts = () => {
        setMenu(menu === "Contacts" ? "Conversations" : "Contacts");
    };

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);



  return (
      <UserMenuContainer className="m-0 p-2 d-flex flex-row align-items-center">
          <Col xs="auto" className="m-0 p-0">
              <Avatar url={localUser.avatar} bgc={"black"} size="50px" />
          </Col>
          <Col xs="auto" className="m-2 p-0">
              <p className="m-0 p-0 text-white">{localUser.name}</p>
          </Col>
          <Col xs="auto" className="ms-auto p-0">
              <Button
                  className="m-1 p-0 bg-transparent border-0"
                  onClick={toggleContacts}
                  id="contacts"
              >
                  <MdGroup
                      color={menu === "Contacts" ? "var(--violet)" : "white"}
                      onClick={toggleContacts}
                      size="1.5em"
                  />
              </Button>

              <Button
                  id="settings"
                  className="m-1 p-0 bg-transparent border-0"
                  onClick={toggleSettings}
              >
                  <MdSettings
                      color={menu === "Settings" ? "var(--violet)" : "white"}
                      onClick={toggleSettings}
                      size="1.5em"
                  />
              </Button>

              <Button
                  className="m-1 p-0 bg-transparent border-0"
                  onClick={handleShow}
              >
                  <MdOutlineLogout
                      size="1.5em"
                      color={show ? "var(--violet)" : "white"}
                  />
              </Button>

              {/* LOG OUT MODAL */}
              <Modal show={show} onHide={handleClose} centered>
                  <LogOutModal>
                      <LogOutTitle>
                          Are you sure you want to log out?
                      </LogOutTitle>
                      <StyledButton variant="secondary" onClick={handleClose}>
                          Cancel
                      </StyledButton>
                      <StyledButton variant="primary" onClick={handleLogOut}>
                          Log Out
                      </StyledButton>
                  </LogOutModal>
              </Modal>
          </Col>
      </UserMenuContainer>
  );
}

const UserMenuContainer = styled(Row)`
    background: var(--darkgrey);
`

const LogOutTitle = styled(Modal.Title)`
    margin: 10px;
    color: white;
`

const LogOutModal = styled(Modal.Body)`
    background: var(--darkgrey);
`

const StyledButton = styled(Button)`
    margin: 10px;
`

export default UserMenu