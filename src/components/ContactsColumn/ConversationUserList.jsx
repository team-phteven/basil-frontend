import React, { useState, useEffect, useInsertionEffect } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ContactSlab } from "../GlobalComponents/ContactSlab";
import InviteModal from "./InviteModal";
import TimeModal from "./TimeModal";
import { allContacts } from "../../utils/getAllContacts";
import { useUser } from "../../contexts/UserProvider";
import IconButton from "../GlobalComponents/IconButton";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import axios from "axios";

import {
    MdTimelapse,
    MdMeetingRoom,
    MdModeEdit,
    MdPersonAdd,
} from "react-icons/md";

export const ConversationUserList = () => {
    const {
        selectedConversation,
        setSelectedConversation,
        selectedConversationUsers,
        getConversations,
    } = useConversations();

    const [editMode, setEditMode] = useState(false);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        if (selectedConversation?.groupName) {
            setGroupName(selectedConversation.groupName);
        } else {
            setGroupName(" ");
        }
    }, [selectedConversation]);

    const handleChange = (e) => {
        setGroupName(e.target.value);
    };

    const { localUser } = useUser();

    // invite modal logic
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const closeInviteModal = () => {
        setInviteModalOpen(false);
    };

    // time modal logic
    const [timeModalOpen, setTimeModalOpen] = useState(false);
    const closeTimeModal = () => {
        setTimeModalOpen(false);
    };

    const submitEdit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/rename`,
                {
                    conversationId: selectedConversation._id,
                    groupName: groupName,
                },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });

        getConversations();
        setEditMode(false);
    };

    const leaveGroup = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/remove`,
                {
                    conversationId: selectedConversation._id,
                },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });

        getConversations();
        setSelectedConversation(null);
    };

    return (
        <Col style={{ backgroundColor: "var(--midgrey)" }}>
            {editMode ? (
                <Form onSubmit={submitEdit}>
                    <Form.Group className="p-0 mb-4 mt-4">
                        <Form.FloatingLabel label="Group Name">
                            <Form.Control
                                className="border-0"
                                id="name"
                                type="text"
                                value={groupName}
                                onChange={handleChange}
                                placeholder="Group Name"
                                required
                            />
                        </Form.FloatingLabel>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 text-white"
                    >
                        Submit
                    </Button>
                </Form>
            ) : (
                <h2 className="m-2">{groupName}</h2>
            )}
            <Row className="m-0 p-2 gap-2 d-flex flex-row justify-content-start">
                <IconButton
                    action={() => setTimeModalOpen(true)}
                    icon={MdTimelapse}
                    color="var(--darkgrey)"
                />

                <Modal show={timeModalOpen} onHide={closeTimeModal}>
                    <TimeModal closeTimeModal={closeTimeModal} />
                </Modal>

                {selectedConversation?.isGroupConversation && (
                    <>
                        <IconButton
                            icon={MdPersonAdd}
                            action={() => {
                                setInviteModalOpen(true);
                            }}
                            color="var(--darkgrey)"
                        />
                        <Modal show={inviteModalOpen} onHide={closeInviteModal}>
                            <InviteModal closeModal={closeInviteModal} />
                        </Modal>
                    </>
                )}
                {selectedConversation?.isGroupConversation && (
                    <IconButton
                        action={() => setEditMode(true)}
                        icon={MdModeEdit}
                        color="var(--darkgrey)"
                    />
                )}
                {selectedConversation?.isGroupConversation && (
                    <IconButton icon={MdMeetingRoom} color="var(--darkgrey)" action={() => {leaveGroup()}}/>
                )}
            </Row>
            <Row className="m-0 p-0">
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
                </Col>
            </Row>
        </Col>
    );
};
