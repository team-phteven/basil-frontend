import React, { useState, useEffect } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import { ContactSlab } from "./ContactSlab";

export const ConversationUserList = () => {
    const { selectedConversation } = useConversations();
    const [conversationUsers, setConversationUsers] = useState(['test']);

    useEffect(() => {
        if (selectedConversation)
        if (selectedConversation) setConversationUsers(selectedConversation.users);
    }, [selectedConversation]);

    useEffect(() => {
        console.log(conversationUsers)
    }, [conversationUsers])

    return (
        <Row className="w-100 h-100 m-0 p-0">
            <Col className="p-0 m-0">
            {conversationUsers && conversationUsers.map((user, index) => (
                <ContactSlab contact={user} size="40px" fontSize="14px"/>     
             ))}
            </Col>
        </Row>
    );
};
