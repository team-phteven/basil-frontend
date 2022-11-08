import React from "react";
import Row from "react-bootstrap/Row";
import MessageInput from "./MessageInput";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import MessageList from "./MessageList";

const OpenConversation = () => {
    const { localUser } = useUser();
    const { selectedConversationMessages, selectedConversation } =
        useConversations();

    return (
        <>
            <Row className="mb-4 mx-2 flex-grow-1" >
                <MessageList messages={selectedConversationMessages} />
            </Row>
            <Row >
                <MessageInput
                    selectedConversation={selectedConversation}
                    localUser={localUser}
                />
            </Row>
        </>
    );
};

export default OpenConversation;
