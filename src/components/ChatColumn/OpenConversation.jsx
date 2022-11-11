import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import MessageInput from "./MessageInput";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import MessageList from "./MessageList";
import { io } from "socket.io-client";
import { useSocket } from "../../contexts/SocketProvider";

const OpenConversation = () => {
    const { localUser } = useUser();
    const {
        selectedConversationMessages,
        selectedConversation,
        setSelectedConversationMessages,
    } = useConversations();

    const socket = useSocket();


    useEffect(() => {
        if (socket && selectedConversation) {
            socket.on("message received", (message) => updateMessages(message))};
    }, [selectedConversation, selectedConversationMessages]);

    const updateMessages = (message) => {
        console.log("selected" + selectedConversation._id);
        console.log("message" + message.conversation._id);
        if (message.conversation._id != selectedConversation._id) {
            console.log("NOTIFICATION!!!");
        } else {
            setSelectedConversationMessages([
                message,
                ...selectedConversationMessages,
            ]);
        }
    };

    return (
        <>
            <Row className="mb-4 mx-2 flex-grow-1">
                <MessageList/>
            </Row>
            <Row>
                <MessageInput
                    selectedConversation={selectedConversation}
                    localUser={localUser}
                />
            </Row>
        </>
    );
};

export default OpenConversation;
