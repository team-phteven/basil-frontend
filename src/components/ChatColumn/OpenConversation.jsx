// Packages
import styled from "styled-components";
// Custom Components
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
// BS Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const OpenConversation = () => {

    return (
        <ConversationContainer>
            <ConversationColumn>
                <MessageListRow>
                    <MessageList />
                </MessageListRow>
                <MessageInputRow>
                    <MessageInput/>
                </MessageInputRow>
            </ConversationColumn>
        </ConversationContainer>
    );
};

const MessageListRow = styled(Row)`
    flex-direction: column-reverse;
    overflow-y: scroll;
    width: 100%;
    margin: 0;
    flex-grow: 1;
`;

const ConversationContainer = styled(Row)`
    margin: 0;
    padding: 0;
`

const ConversationColumn = styled(Col)`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const MessageInputRow = styled(Row)`
    margin: 0;
    padding-bottom: 20px;
`;

export default OpenConversation;
