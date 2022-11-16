import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import { CheckContactSlab } from "../GlobalComponents/CheckContactSlab";
import axios from "axios";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedUserIds.length == 0) {
            console.log("returnedd!!");
            return;
        }
        console.log("handle submit hit!!====>");
        console.log("conversation ids passed in====>  " + selectedUserIds);
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/api/conversations`,
                { users: selectedUserIds },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        closeCreateGroupModal();
    };

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
            <Modal.Header closeButton>Create Group Conversation</Modal.Header>
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
                    <Button disabled={selectedUserIds.length < 2} type="submit">
                        Create Conversation
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}