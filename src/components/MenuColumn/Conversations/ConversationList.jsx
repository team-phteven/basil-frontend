// Packages
import { useState } from "react";
import styled from "styled-components";
// Contexts
import { useConversations } from "../../../contexts/ConversationsProvider";
// Custom Components
import ConversationSlab from "./ConversationSlab";
import CreateGroupModal from "../CreateGroupModal";
import CreateGroupButton from "./CreateGroupButton";
// BS Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";

const ConversationList = () => {
    // destructure conversation provider
    const { selectedConversation, conversations } = useConversations();

    // open state for create group modal
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    // handle closing create group modal
    const closeCreateGroupModal = () => {
        setCreateGroupModalOpen(false);
    };

    return (
        <StyledCol>
            <UserList>
                <SlabStack>
                    {conversations?.map((conversation, index) => (
                        <ConversationSlab
                            key={index}
                            conversation={conversation}
                            selected={
                                conversation._id == selectedConversation?._id
                            }
                        />
                    ))}
                </SlabStack>
            </UserList>
            <AddButton as={Row} xs="auto">
                <CreateGroupButton
                    action={() => {
                        setCreateGroupModalOpen(true);
                    }}
                />
            </AddButton>

            {/* GROUP CHAT MODAL */}
            <Modal show={createGroupModalOpen} onHide={closeCreateGroupModal}>
                <CreateGroupModal
                    closeCreateGroupModal={closeCreateGroupModal}
                />
            </Modal>
        </StyledCol>
    );
};

const StyledCol = styled(Col)`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
`;

const SlabStack = styled(Stack)`
    padding: 0;
    margin: 0;
`;

const UserList = styled(Row)`
    overflow: hidden;
    flex-grow: 1;
    padding: 0;
    margin: 0;
`;

const AddButton = styled.div`
    pointer-events: none;
    position: sticky;
    bottom: 10px;
    right: 10px;
    justify-content: end;
`;

export default ConversationList;
