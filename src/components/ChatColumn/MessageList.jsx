// Packages
import styled from "styled-components";
// Contexts
import { useConversations } from "../../contexts/ConversationsProvider";
// Custom Components
import Message from "./Message";
import TrailingMessage from "./TrailingMessage";
// BS Components
import Col from "react-bootstrap/Col";

const MessageList = () => {

    // imports from conversations provider
    const {
        selectedConversation,
        selectedConversationMessages,
    } = useConversations();

    // compare a message with the one that came before it:
    const isTrailing = (message, lastMessage) => {
        let trailing = true;
        // not trailing if message senders don't match
        if (message.sender._id !== lastMessage.sender._id) trailing = false;
        // not trailing if last message was more than 60 seconds ago
        var x = new Date(message.createdAt);
        var y = new Date(lastMessage.createdAt);
        let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
        if (seconds > 60) trailing = false;
        return trailing;
    }
    // define the first 'last message' to be compared
    // since the map will start at [0], the first 'lastMessage' is at [1]
    let lastMessage = selectedConversationMessages[1];
    
    return (
        <MessageCol>
            {/* map through messages and return either trailing or regular message */}
            {selectedConversationMessages?.map((message, index) => {
                const render = lastMessage && isTrailing(message, lastMessage) ?
                    <TrailingMessage key={index} message={message} /> :
                    <Message key={index} message={message} />;
                lastMessage = selectedConversationMessages[index + 2];
                return render;
            })}
            {/* Marks the start of conversation */}
            {selectedConversation && <Line />}
            {selectedConversation && <Starter>Start of Conversation</Starter>}
        </MessageCol>
    );
};

const Line = styled.hr`
    color: var(--violet);
    margin: 10px 0px 10px 0px;
`

const Starter = styled.p`
    text-align: center;
    color: var(--violet);
    margin: 10px 0px 0px 0px;
`

const MessageCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: reverse-wrap;
    margin: 0px 0px 20px 0px;
`;

export default MessageList;
