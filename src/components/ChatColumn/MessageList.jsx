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
        <Stack as={StyledCol} gap={4} className="p-0">
            {selectedConversationMessages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
        </Stack>
    );
};

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 20px;
`;

export default MessageList;
