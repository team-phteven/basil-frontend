import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../contexts/UserProvider";
import ConversationList from "../components/ConversationList";
import OpenConversation from "../components/ChatColumn/OpenConversation";
import { useState } from "react";
import Contacts from "../components/Contacts";
import Timer from "../components/RightColumn/Timer";
import ConvoInfo from "../components/RightColumn/ConvoInfo";
import Settings from "../components/Settings";
import styled from "styled-components";
import UserMenu from "../components/UserMenu";

const Profile = () => {
    const [menu, setMenu] = useState("Conversations");

    return (
        <StyledContainer as="main" className="mx-0 p-0 bg-light" fluid>
            <Row className="h-100 m-0 p-0 d-flex flex-row vh-100">
                {/* CONVERSATIONS COLUMN */}
                <ConversationsColumn
                    xs={2}
                    style={{ boxSizing: "border-box", overflow: "hidden" }}
                    className="p-0 m-0 m-0 p-0 d-flex flex-column vh-100"
                >
                    <Conversations className="flex-grow-1 m-0 p-0">
                        {menu === "Conversations" && <ConversationList />}
                        {menu === "Settings" && <Settings />}
                        {menu === "Contacts" && <Contacts />}
                    </Conversations>
                    <UserMenu setMenu={setMenu} menu={menu} />
                </ConversationsColumn>

                <ChatColumn xs={8} className="d-flex flex-column vh-100">
                    <OpenConversation className="vh-100" />
                </ChatColumn>

                <ChatContacts xs={2} className="m-0 p-0 vh-100"></ChatContacts>
            </Row>
        </StyledContainer>
    );
};

const ConversationsColumn = styled(Col)`
    background: var(--midgrey);
`;
const Conversations = styled(Row)``;

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
`;

export default Profile;
