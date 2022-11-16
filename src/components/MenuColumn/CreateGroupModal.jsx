import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import { CheckContactSlab } from "../GlobalComponents/CheckContactSlab";

export default function NewConversationModal({ closeCreateGroupModal }) {
    const { conversations } = useConversations();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const { localUser } = useUser();

    // filter out group conversations
    const getDirectConversations = (conversations) => {
        const result = conversations.filter((conversation) => {
            return !conversation.isGroupConversation;
        });
        return result;
    };

    function handleSubmit(e) {
        e.preventDefault();
    }

    const getContactInfo = (conversation) => {
        const otherUser = conversation.users.find((user) => {
            return user.email !== localUser.email;
        });
        return otherUser;
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUserIds((prevSelectedUserIds) => {
            if (prevSelectedUserIds.includes(userId)) {
                return prevSelectedUserIds.filter((prevId) => {
                    return userId !== prevId;
                });
            } else {
                return [...prevSelectedUserIds, userId];
            }
        });
    };

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {conversations &&
                        getDirectConversations(conversations).map(
                            (conversation, index) => (
                                <>
                                    <CheckContactSlab
                                        key={index}
                                        contact={getContactInfo(conversation)}
                                        handleCheckboxChange={
                                            handleCheckboxChange
                                        }
                                        selectedUserIds={selectedUserIds}
                                    />
                                </>
                            )
                        )}
                    <Button
                        type="submit"
                        onClick={() => console.log(selectedUserIds)}
                    >
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}
