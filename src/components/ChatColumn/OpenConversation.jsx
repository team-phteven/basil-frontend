import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import MessageInput from "./MessageInput";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import MessageList from "./MessageList";
import { io } from "socket.io-client";

const OpenConversation = () => {
    const { localUser } = useUser();
    const { selectedConversationMessages, selectedConversation } =
        useConversations();

    const [socketConnected, setSocketConnected] = useState(false);

    const socket = io(process.env.REACT_APP_BASE_URL);

    useEffect(() => {
        socket.emit("setup", localUser.email);

        socket.on("connected", () => {
            setSocketConnected(true);
            console.log("connected");
        });

        return () => {
            socket.off("connected");
        };
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            socket.emit("join conversation", selectedConversation._id);
        }
    }, [selectedConversation]);

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
