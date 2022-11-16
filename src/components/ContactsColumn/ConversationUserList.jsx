import React, { useState, useEffect } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ContactSlab } from "../GlobalComponents/ContactSlab";
import InviteModal from "./InviteModal";

export const ConversationUserList = () => {
    const { selectedConversation } = useConversations();
    const [conversationUsers, setConversationUsers] = useState(null);

    useEffect(() => {
        if (selectedConversation)
            setConversationUsers(selectedConversation.users);
    }, [selectedConversation]);

    // invite modal logic
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const closeInviteModal = () => {
        setInviteModalOpen(false);
    };

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
                <Button
                    onClick={() => {
                        console.log(conversationUsers);
                        setInviteModalOpen(true);
                    }}
                >
                    Invite Contacts
                </Button>
                {/* GROUP CHAT MODAL */}
                <Modal show={inviteModalOpen} onHide={closeInviteModal}>
                    <InviteModal
                        closeCreateGroupModal={closeInviteModal}
                        conversationUsers={conversationUsers}
                    />
                </Modal>
            </Col>
        </Row>
    );
};
