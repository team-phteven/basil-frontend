// Packages
import {useState} from "react";
import styled from "styled-components"
// BS Components
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// Custom Components
import ConversationList from "./ConversationList";
import Settings from "../Settings/Settings";
import Contacts from "../Contacts/Contacts";
import UserMenu from "../UserMenu";

export const DesktopConversationsColumn = () => {
    
    // state for which menu is open
    const [menu, setMenu] = useState("Conversations");

    return (
        <ConversationsColumn
            xs={4}
            lg={2}
            // overide scroll styles
            className="conversationColumn"
        >
            <Conversations>
                {/* show menu component depending on menu state */}
                {menu === "Conversations" && <ConversationList />}
                {menu === "Settings" && <Settings />}
                {menu === "Contacts" && <Contacts />}
            </Conversations>
            <UserMenu setMenu={setMenu} menu={menu} />
        </ConversationsColumn>
    );
};

const ConversationsColumn = styled(Col)`
    background: var(--midgrey);
    box-sizing: border-box;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
const Conversations = styled(Row)`
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    margin: 0;
    padding: 0;
`;
