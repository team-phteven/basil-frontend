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

    const [socketConnected, setSocketConnected] = useState(false);

    let selectedConversationComparison;
    var tempMessages = selectedConversationMessages;

    const socket = useSocket();

    
    return (
        <>
            <Row className="mb-4 mx-2 flex-grow-1">
                <MessageList messages={selectedConversationMessages} />
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
