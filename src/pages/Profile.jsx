import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../contexts/UserProvider";
import ConversationList from "../components/MenuColumn/Conversations/ConversationList";
import OpenConversation from "../components/ChatColumn/OpenConversation";
import { useEffect, useState } from "react";
import Contacts from "../components/MenuColumn/Contacts/Contacts";
import Timer from "../components/RightColumn/Timer";
import Settings from "../components/MenuColumn/Settings/Settings";
import styled from "styled-components";
import UserMenu from "../components/MenuColumn/UserMenu";
import axios from "axios";
import { ConversationUserList } from "../components/ContactsColumn/ConversationUserList";
import useViewport from "../hooks/useViewport";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { MdMenu, MdGroups } from "react-icons/md";
import { DesktopConversationsColumn } from "../components/MenuColumn/Conversations/DesktopConversationsColumn";
import { MobileConversationsColumn } from "../components/MenuColumn/Conversations/MobileCoversationsColumn";

const Profile = () => {
    const { localUser } = useUser();
    const { width } = useViewport();
    const conversationsBreakpoint = 1300;
    const contactsBreakpoint = 1600;

    const [conversationsShow, setConversationsShow] = useState(false);
    const handleConversationsClose = () => setConversationsShow(false);
    const handleConversationsShow = () => setConversationsShow(true);

    const [contactsShow, setContactsShow] = useState(false);
    const handleContactsClose = () => setContactsShow(false);
    const handleContactsShow = () => setContactsShow(true);

    return (
        <StyledContainer as="main" className="mx-0 p-0 bg-light" fluid>
            {width <= conversationsBreakpoint && (
                <>
                    <Button
                        className="m-1 p-0"
                        onClick={handleConversationsShow}
                        style={{
                            position: "absolute",
                            backgroundColor: "transparent",
                            border: "none",
                        }}
                    >
                        <MdMenu color="var(--darkgrey)" size="50px" />
                    </Button>
                    <Offcanvas
                        show={conversationsShow}
                        onHide={handleConversationsClose}
                    >
                        <Offcanvas.Header
                            style={{ background: "var(--midgrey)" }}
                            closeButton
                        >
                            <img
                                src="BasilLogo.svg"
                                width="60px"
                                style={{ margin: "0 auto" }}
                            ></img>
                        </Offcanvas.Header>
                        <MobileConversationsColumn />
                    </Offcanvas>
                </>
            )}
            <Row className="h-100 m-0 p-0 d-flex flex-row vh-100">
                {/* CONVERSATIONS COLUMN */}
                {width > conversationsBreakpoint && (
                    <DesktopConversationsColumn />
                )}

                <ChatColumn
                    xs={8}
                    className="d-flex flex-column vh-100 flex-grow-1"
                >
                    <OpenConversation className="vh-100" />
                    {/* <ConvoInfo /> */}
                </ChatColumn>
                {width > contactsBreakpoint && (
                    <ChatContacts xs={2} className="m-0 p-0 vh-100">
                        <ConversationUserList />
                    </ChatContacts>
                )}
            </Row>
            {width <= contactsBreakpoint && (
                <>
                    <Button
                        className="m-1 p-0"
                        onClick={handleContactsShow}
                        style={{
                            position: "absolute",
                            top: "0",
                            right: "20px",
                            backgroundColor: "transparent",
                            border: "none",
                        }}
                    >
                        <MdGroups color="var(--darkgrey)" size="40px" />
                    </Button>
                    <Offcanvas
                        placement="end"
                        show={contactsShow}
                        onHide={handleContactsClose}
                    >
                        <Offcanvas.Header closeButton>
                            Contacts
                        </Offcanvas.Header>
                        <ConversationUserList />
                    </Offcanvas>
                </>
            )}
        </StyledContainer>
    );
};

const ConversationsColumn = styled(Col)`
    background: var(--midgrey);
`;
const Conversations = styled(Row)`
    overflow-y: auto;
    overflow-x: hidden;
`;

const ChatColumn = styled(Col)`
    background: var(--lightgrey);
    padding: 0;
`;

const ChatContacts = styled(Col)`
    background: var(--midgrey);
`;

const StyledContainer = styled(Container)`
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: "relative";
`;

export default Profile;
