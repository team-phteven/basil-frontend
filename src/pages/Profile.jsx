// Packages
import { useState } from "react";
import styled from "styled-components";
// Contexts
import { useConversations } from "../contexts/ConversationsProvider";
import useViewport from "../hooks/useViewport";
// Custom Components
import OpenConversation from "../components/ChatColumn/OpenConversation";
import { ConversationUserList } from "../components/ContactsColumn/ConversationUserList";
import { DesktopConversationsColumn } from "../components/MenuColumn/Conversations/DesktopConversationsColumn";
import { MobileConversationsColumn } from "../components/MenuColumn/Conversations/MobileCoversationsColumn";
// BS Components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
// Icons
import { MdMenu, MdGroups } from "react-icons/md";

const Profile = () => {
    const { width } = useViewport();
    const conversationsBreakpoint = 1300;
    const contactsBreakpoint = 1600;
    const { selectedConversation } = useConversations();

    const [conversationsShow, setConversationsShow] = useState(false);
    const handleConversationsClose = () => setConversationsShow(false);
    const handleConversationsShow = () => setConversationsShow(true);

    const [contactsShow, setContactsShow] = useState(false);
    const handleContactsClose = () => setContactsShow(false);
    const handleContactsShow = () => setContactsShow(true);

    return (
        <StyledContainer as="main" fluid>
            {width <= conversationsBreakpoint && (
                <>
                    <MenuButton onClick={handleConversationsShow}>
                        <MdMenu color="var(--darkgrey)" size="35px" />
                    </MenuButton>
                    <Offcanvas
                        show={conversationsShow}
                        onHide={handleConversationsClose}
                    >
                        <OffcanvasHeader closeButton>
                            <BasilLogo
                                src="BasilLogo2.svg"
                                width="60px"
                            ></BasilLogo>
                        </OffcanvasHeader>
                        <MobileConversationsColumn
                            onHide={handleConversationsClose}
                        />
                    </Offcanvas>
                </>
            )}
            <StyledRow>
                {width > conversationsBreakpoint && (
                    <DesktopConversationsColumn />
                )}

                <ChatColumn xs={8}>
                    <OpenConversation />
                </ChatColumn>
                {width > contactsBreakpoint && (
                    <ChatContacts xs={2}>
                        <ConversationUserList />
                    </ChatContacts>
                )}
            </StyledRow>
            {selectedConversation && width <= contactsBreakpoint && (
                <>
                    <ChatContactsButton onClick={handleContactsShow}>
                        <MdGroups color="var(--darkgrey)" size="35px" />
                    </ChatContactsButton>
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

const MenuButton = styled(Button)`
    position: absolute;
    background-color: var(--midgrey);
    border: none;
    z-index: 1;
    margin: 8px;
    padding: 0;
    top: 0;
`;

const ChatContactsButton = styled(Button)`
    position: absolute;
    background-color: var(--midgrey);
    border: none;
    z-index: 1;
    margin: 8px;
    padding: 0;
    top: 0;
    right: 20px;
`;

const StyledRow = styled(Row)`
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const BasilLogo = styled.img`
    margin: 0 auto;
`;

const OffcanvasHeader = styled(Offcanvas.Header)`
    background: var(--midgrey);
`

const ChatColumn = styled(Col)`
    background: var(--lightgrey);
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-grow: 1;
`;

const ChatContacts = styled(Col)`
    padding: 0;
    margin: 0;
    background: var(--midgrey);
`;

const StyledContainer = styled(Container)`
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: "relative";
    margin: 0;
    padding: 0;
    background: var(--lightgrey);
`;

export default Profile;
