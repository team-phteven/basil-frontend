import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../contexts/UserProvider";
import ConversationList from "../components/MenuColumn/Conversations/ConversationList";
import OpenConversation from "../components/ChatColumn/OpenConversation";
import { useEffect, useState } from "react";
import Contacts from "../components/MenuColumn/Contacts/Contacts";
import Timer from "../components/RightColumn/Timer";
import ConvoInfo from "../components/ChatColumn/ConvoInfo";
import Settings from "../components/MenuColumn/Settings/Settings";
import styled from "styled-components";
import UserMenu from "../components/MenuColumn/UserMenu";
import axios from "axios";
import { ConversationUserList } from "../components/ContactsColumn/ConversationUserList";

const Profile = () => {
    const [menu, setMenu] = useState("Conversations");
    const { localUser } = useUser();

    const getContacts = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/users/get-contacts`, config)
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });

        console.log(data)
    };

    useEffect(() => {
        getContacts()
    }, [localUser])

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

                <ChatColumn
                    xs={8}
                    className="d-flex flex-column vh-100 flex-grow-1"
                >
                    <OpenConversation className="vh-100" />
                    {/* <ConvoInfo /> */}
                </ChatColumn>
                <ChatContacts xs={2} className="m-0 p-0 vh-100">
                    <ConversationUserList />
                </ChatContacts>
            </Row>
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
`;

export default Profile;
