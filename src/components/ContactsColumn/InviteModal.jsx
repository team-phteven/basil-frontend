import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserProvider";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";
import { CheckContactSlab } from "../GlobalComponents/CheckContactSlab";
import axios from "axios";

export default function InviteModal({ closeModal }) {
    const { localUser, contacts } = useUser();
    const { conversations, selectedConversation, selectedConversationUsers, getConversations, setSelectedConversationUsers } =
        useConversations();
    const [selectedConversationIds, setSelectedConversationIds] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect(() => {
        const ids = selectedConversationUsers.map((user) => user._id);
        setSelectedConversationIds(ids);
    }, [selectedConversation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedUserIds.length == 0) {
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/add-users`,
                {
                    users: selectedUserIds,
                    conversationId: selectedConversation._id,
                },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        //  sets the selected conversation's users so
        //  new user is instantly added to conversation contact list 
        setSelectedConversationUsers(data.users)
        // instantly adds their avatar to the conversation slab
        // by fetching convos again (while maintaining selected convo)
        getConversations();
        // closes modal
        closeModal();
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
            <Modal.Header closeButton>Add Contacts to Group</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts &&
                        selectedConversationIds &&
                        contacts.map((contact, index) => {
                            return (
                                <CheckContactSlab
                                    key={index}
                                    contact={contact}
                                    disabled={selectedConversationIds.includes(
                                        contact._id
                                    )}
                                    handleCheckboxChange={handleCheckboxChange}
                                    selectedUserIds={selectedUserIds}
                                />
                            );
                        })}
                    <Button disabled={selectedUserIds.length < 1} type="submit">
                        Add Users
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}
