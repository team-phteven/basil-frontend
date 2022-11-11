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
            selectedConversation
        } = useConversations();


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
