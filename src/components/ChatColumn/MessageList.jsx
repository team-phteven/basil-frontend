import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Message from "./Message";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useConversations } from "../../contexts/ConversationsProvider";

const MessageList = () => {
    const {
        selectedConversationMessages,
    } = useConversations();

    return (
        <StyledCol>
            {selectedConversationMessages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
        </StyledCol>
    );
};

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: reverse-wrap;
    margin: 0px 0px 20px 0px;
`;

export default MessageList;
