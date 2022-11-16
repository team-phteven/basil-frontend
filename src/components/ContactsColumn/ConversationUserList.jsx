import React, { useState, useEffect } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ContactSlab } from "../GlobalComponents/ContactSlab";

export const ConversationUserList = () => {
    const { selectedConversation } = useConversations();
    const [conversationUsers, setConversationUsers] = useState(null);

    useEffect(() => {
        if (selectedConversation)
            setConversationUsers(selectedConversation.users);
    }, [selectedConversation]);

    return (
        <Row className="w-100 h-100 m-0 p-0">
            <Col className="p-0 m-0">
                {conversationUsers &&
                    conversationUsers.map((user, index) => (
                        <ContactSlab
                            contact={user}
                            key={index}
                            size="40px"
                            fontSize="14px"
                        />
                    ))}
                <Button>Invite Contacts</Button>
            </Col>
        </Row>
    );
};
