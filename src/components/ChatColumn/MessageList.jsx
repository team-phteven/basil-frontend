import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Message from "./Message";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useSocket } from "../../contexts/SocketProvider";
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

const MessageList = () => {
    const {
        selectedConversationMessages,
        selectedConversation,
    } = useConversations();


    return (
        <Stack as={StyledCol} gap={4} className="p-0">
            {selectedConversationMessages && selectedConversationMessages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
        </Stack>
    );
};

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
`;

export default MessageList;
