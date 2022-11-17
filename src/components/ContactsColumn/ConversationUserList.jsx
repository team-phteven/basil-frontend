import React, { useState, useEffect } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ContactSlab } from "../GlobalComponents/ContactSlab";
import InviteModal from "./InviteModal";
import { allContacts } from "../../utils/getAllContacts";
import { useUser } from "../../contexts/UserProvider";

export const ConversationUserList = () => {
    const { selectedConversation, setSelectedConversation, selectedConversationUsers, getConversations } = useConversations();

    // invite modal logic
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const closeInviteModal = () => {
        setInviteModalOpen(false);
    };

    return (
        <Row className="w-100 h-100 m-0 p-0">
            <Col className="p-0 m-0">
                {selectedConversationUsers &&
                    selectedConversationUsers.map((user, index) => (
                        <ContactSlab
                            contact={user}
                            key={index}
                            size="40px"
                            fontSize="14px"
                        />
                    ))}
            {selectedConversation?.isGroupConversation &&
            <>
                <Button
                    onClick={() => {
                        setInviteModalOpen(true);
                    }}
                    >
                    Invite Contacts
                </Button>
                
                    <Modal show={inviteModalOpen} onHide={closeInviteModal}>
                        <InviteModal
                            closeCreateGroupModal={closeInviteModal}
                            />
                    </Modal>
            </>}
            </Col>
        </Row>
    );
};
