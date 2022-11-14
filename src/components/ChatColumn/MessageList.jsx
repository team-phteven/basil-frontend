import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Message from "./Message";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useConversations } from "../../contexts/ConversationsProvider";
import TrailingMessage from "./TrailingMessage";
import { DateTime } from "luxon";


const MessageList = () => {
    const {
        selectedConversationMessages,
    } = useConversations();

    let lastMessage = selectedConversationMessages[1];

    const isTrailing = (message, lastMessage) => {
        let trailing = true;
        if (message.sender._id !== lastMessage.sender._id) trailing = false;
        var x = new Date(message.createdAt);
        var y = new Date(lastMessage.createdAt);
        let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
        if (seconds > 60) trailing = false;
        return trailing;
    }

    return (
        <StyledCol>

            {selectedConversationMessages && selectedConversationMessages.map((message, index) => {
                const render = lastMessage && isTrailing(message, lastMessage) ?
                    <TrailingMessage key={index} message={message} /> :
                    <Message key={index} message={message} />;
                lastMessage = selectedConversationMessages[index + 2];
                return render;
            })}
            <Line></Line>
            <Starter>Start of Conversation</Starter>
        </StyledCol>
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

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: reverse-wrap;
    margin: 0px 0px 20px 0px;
`;

export default MessageList;
