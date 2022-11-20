import React, { useState, useEffect } from "react";
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

    return (
        <Col style={{ backgroundColor: "var(--midgrey)" }}>
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
                    <IconButton
                        icon={MdPersonAdd}
                        action={() => {
                            setInviteModalOpen(true);
                        }}
                        color="var(--darkgrey)"
                    />
                )}
                {selectedConversation?.isGroupConversation && (
                    <IconButton icon={MdModeEdit} color="var(--darkgrey)" />
                )}
                {selectedConversation?.isGroupConversation && (
                    <IconButton icon={MdMeetingRoom} color="var(--darkgrey)" />
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
            <Row className="m-0 p-0">
                {selectedConversation?.isGroupConversation && (
                    <Col xs="auto" className="m-2 p-0">
                        <Button
                            onClick={() => {
                                setInviteModalOpen(true);
                            }}
                        >
                            Invite Contacts
                        </Button>

                        <Modal show={inviteModalOpen} onHide={closeInviteModal}>
                            <InviteModal closeModal={closeInviteModal} />
                        </Modal>
                    </Col>
                )}
            </Row>
        </Col>
    );
};
