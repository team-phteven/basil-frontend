import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../contexts/UserProvider";
import ConversationList from "../components/ConversationList";
import OpenConversation from "../components/ChatColumn/OpenConversation";
import { useState } from "react";
import { MdOutlineLogout, MdSettings, MdGroupAdd } from "react-icons/md";
import Contacts from "../components/Contacts";
import Settings from "../components/Settings";
import styled from 'styled-components';

const Profile = () => {
    const navigate = useNavigate();

    const [menu, setMenu] = useState("Conversations");

    const handleLogOut = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    const toggleSettings = () => {
      setMenu(menu === "Settings" ? "Conversations" : "Settings")
    }

    const toggleContacts = () => {
      setMenu(menu === "Contacts" ? "Conversations" : "Contacts");
    };

    const { localUser } = useUser();

    return (
        <StyledContainer as="main" className="mx-0 p-0 bg-light" fluid>
            <Row className="h-100 m-0 p-0 d-flex flex-row vh-100">
                {/* CONVERSATIONS COLUMN */}

                <Col
                    xs={3}
                    style={{ boxSizing: "border-box", overflow: "hidden" }}
                    className="p-0 m-0 bg-transparent m-0 p-0 d-flex flex-column vh-100"
                >
                    <Row className="flex-grow-1 m-0 p-0">
                        {menu === "Conversations" && <ConversationList />}
                        {menu === "Settings" && <Settings />}
                        {menu === "Contacts" && <Contacts />}
                    </Row>

                    {/* Menu */}
                    <Row className="bg-black m-0 p-2 d-flex flex-row align-items-center">
                        <Col xs="auto" className="m-0 p-0">
                            <Avatar
                                url={localUser.avatar}
                                bgc={"black"}
                                size="50px"
                            />
                        </Col>
                        <Col xs="auto" className="m-2 p-0">
                            <p className="m-0 p-0 text-white">
                                {localUser.name}
                            </p>
                        </Col>
                        <Col xs="auto" className="ms-auto p-0">
                            <Button
                                className="m-1 p-0 bg-transparent border-0"
                                onClick={toggleContacts}
                                id="contacts"
                            >
                                <MdGroupAdd
                                    color={
                                        menu === "Contacts" ? "grey" : "white"
                                    }
                                    onClick={toggleContacts}
                                    size="2em"
                                />
                            </Button>

                            <Button
                                id="settings"
                                className="m-1 p-0 bg-transparent border-0"
                                onClick={toggleSettings}
                            >
                                <MdSettings
                                    color={
                                        menu === "Settings" ? "grey" : "white"
                                    }
                                    onClick={toggleSettings}
                                    size="2em"
                                />
                            </Button>

                            <Button
                                className="m-1 p-0 bg-transparent border-0"
                                onClick={handleLogOut}
                            >
                                <MdOutlineLogout size="2em" />
                            </Button>
                        </Col>
                    </Row>
                </Col>
                {/* CHAT COLUMN */}
                <Col xs={7} className="bg-transparent d-flex flex-column vh-100">
                    <OpenConversation className="vh-100"/>
                </Col>
                {/* IN-CHAT CONTACTS */}
                <Col xs={2} className="bg-secondary m-0 p-0 vh-100"></Col>
            </Row>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
`

export default Profile;
