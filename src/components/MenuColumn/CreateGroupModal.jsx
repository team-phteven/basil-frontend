// Packages
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
// Contexts
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
// Custom Components
import CheckContactSlab from "../GlobalComponents/CheckContactSlab";
// BS Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


export default function NewConversationModal({ closeCreateGroupModal }) {
    const { conversations, getConversations } = useConversations();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const { localUser } = useUser();
    const [input, setInput] = useState('');

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
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/api/conversations`,
                { users: selectedUserIds, groupName: input },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });

        getConversations();
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

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <>
            <ModalHeader closeButton>Create Group Conversation</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {conversations &&
                        getDirectConversations(conversations).map(
                            (conversation, index) => (
                                    <CheckContactSlab
                                        key={index}
                                        contact={getContactInfo(conversation)}
                                        handleCheckboxChange={
                                            handleCheckboxChange
                                        }
                                        selectedUserIds={selectedUserIds}
                                    />
                            )
                        )}
                    <FormGroup>
                        <Form.FloatingLabel label="Group Name">
                            <FormControl
                                id="name"
                                type="text"
                                value={input}
                                onChange={handleInput}
                                placeholder="Group Name"
                                required
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                    <Button disabled={selectedUserIds.length < 2} type="submit">
                        Create Conversation
                    </Button>
                </Form>
            </ModalBody>
        </>
    );
}

const ModalBody = styled(Modal.Body)`
    background-color: var(--lightgrey);
`

const ModalHeader = styled(Modal.Header)`
    background-color: var(--lightgrey);
`

const FormGroup = styled(Form.Group)`
    padding: 0;
    margin: 20px 0 20px 0;
`

const FormControl = styled(Form.Control)`
    border: none;
`