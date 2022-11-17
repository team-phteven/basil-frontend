import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import styled from 'styled-components'
import { ConversationSlab } from "./ConversationSlab";
import { useConversations } from "../../../contexts/ConversationsProvider";
import { MdGroupAdd, MdOutlineChatBubble } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import CreateGroupModal from "../CreateGroupModal";

const ConversationList = () => {

    const {
        selectedConversation,
        conversations,
    } = useConversations();

        // logic for create convo modal
        const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

        const closeCreateGroupModal = () => {
            setCreateGroupModalOpen(false);
        };

    return (
        <Col
            style={{ position: "relative" }}
            className="d-flex flex-column p-0 m-0"
        >
            <Row
                style={{
                    overflow: "hidden",
                }}
                className="p-0 m-0 flex-grow-1"
            >
                <Stack className="p-0 m-0">
                    {conversations?.map((conversation, index) => (
                            <ConversationSlab
                                key={index}
                                conversation={conversation}
                                selected={
                                    conversation._id == selectedConversation?._id
                                }
                            />
                        ))}
                </Stack>
            </Row>
            <AddButton onClick={() => setCreateGroupModalOpen(true)}>
                <MdOutlineChatBubble color="var(--violet)" size="60px"/>
                <MdGroupAdd
                    color="var(--lightgrey)"
                    size="30px"
                    style={{ marginTop: "10px", position: "fixed" }}
                />
            </AddButton>

            {/* GROUP CHAT MODAL */}
            <Modal show={createGroupModalOpen} onHide={closeCreateGroupModal}>
                <CreateGroupModal
                    closeCreateGroupModal={closeCreateGroupModal}
                />
            </Modal>
        </Col>
    );
};

const AddButton = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: start;
    cursor: pointer;
    filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.5));
    transition: 0.5s;
    &:hover {
        transform: translateY(-10px);
        filter: drop-shadow(10px 10px 6px rgba(0, 0, 0, 0.5));
    }
`;

export default ConversationList;
