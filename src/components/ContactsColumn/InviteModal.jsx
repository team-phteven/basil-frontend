// Packages
import { useEffect, useState } from "react";
import axios from "axios";
// Contexts
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
// Custom Components
import CheckContactSlab from "../GlobalComponents/CheckContactSlab";
// BS Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function InviteModal({ closeModal }) {
    // destructure user provider
    const { localUser, contacts } = useUser();
    // destructure conversations provider
    const { selectedConversation, 
        selectedConversationUsers, 
        getConversations, 
        setSelectedConversationUsers } =
        useConversations();
    
    // state for users already in selected conversation
    const [selectedConversationIds, setSelectedConversationIds] = useState([]);
    // state for selected users in menu
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    // set user ids of current conversation whenever conversation changes
    useEffect(() => {
        const ids = selectedConversationUsers.map((user) => user._id);
        setSelectedConversationIds(ids);
    }, [selectedConversation]);

    // submit new users to conversation
    const handleSubmit = async (e) => {
        // prevent page from refresh
        e.preventDefault();
        // return if no selected ids
        if (selectedUserIds.length == 0) {
            return;
        }
        // add JWT
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios put request with users to add to conversation
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

    // handles the selection and deselection of checkboxes
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
            <Modal.Header closeButton>
                <h2>Invite to Conversation</h2>
            </Modal.Header>
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
