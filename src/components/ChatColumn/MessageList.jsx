import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Message from "./Message";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useSocket } from "../../contexts/SocketProvider";
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

const MessageList = ({ messages }) => {
    const socket = useSocket();
    const { localUser } = useUser();
    const { setSelectedConversationMessages } = useConversations();

    useEffect(() => {
        socket.emit("setup", localUser.email);

        socket.on("connected", () => {
            // setSocketConnected(true);
            console.log("connected");
        });

        socket.on("message received", (newMessageReceived) => {
            console.log("<------message received in frontend!--->");
            // if (
            // !selectedConversationComparison ||
            // selectedConversationComparison._id !==
            //     newMessageReceived.conversation._id
            // ) {
            // give notif
            // } else {
            console.log("else message received hit!!");
            console.log("current messages in message list state: " + messages);
            setSelectedConversationMessages([newMessageReceived, ...messages]);
            // }
        });

        return () => {
            socket.off("connected");
        };
    });
    return (
        <Stack as={StyledCol} gap={4} className="p-0">
            {messages &&
                messages.map((message, index) => (
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
