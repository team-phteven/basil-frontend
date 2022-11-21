// Packages
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// Contexts
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
// Custom Components
import ContactSlab from "../GlobalComponents/ContactSlab";
import TimeModal from "./TimeModal";
import InviteModal from "./InviteModal";
import IconButton from "../GlobalComponents/IconButton";
// BS Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// Icons
import {
    MdTimelapse,
    MdMeetingRoom,
    MdModeEdit,
    MdPersonAdd,
} from "react-icons/md";

export const ConversationUserList = () => {
    // destructure conversation provider
    const {
        selectedConversation,
        setSelectedConversation,
        selectedConversationUsers,
        getConversations,
    } = useConversations();
    // destructure user provider
    const { localUser } = useUser();

    // state for edit mode of group name
    const [editMode, setEditMode] = useState(false);
    // state of group name
    const [groupName, setGroupName] = useState("");

    // set group name when a conversation is selected
    useEffect(() => {
        if (selectedConversation?.groupName) {
            setGroupName(selectedConversation.groupName);
        } else {
            setGroupName(" ");
        }
    }, [selectedConversation]);

    // handle group name change when in edit mode
    const handleChange = (e) => {
        setGroupName(e.target.value);
    };

    // invite modal open state
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    // close invite modal
    const closeInviteModal = () => {
        setInviteModalOpen(false);
    };

    // time modal open state
    const [timeModalOpen, setTimeModalOpen] = useState(false);
    // close time modal
    const closeTimeModal = () => {
        setTimeModalOpen(false);
    };

    // submit an edited group name
    const submitEdit = async (e) => {
        e.preventDefault();
        // add JWT 
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios request to API
        const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/rename`,
                {
                    conversationId: selectedConversation._id,
                    groupName: groupName,
                },
                config
            ).catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        // get all conversation again to update name in all locations
        getConversations();
        // turn edit mode to false
        setEditMode(false);
    };

    // handle leaving group
    const leaveGroup = async () => {
        // add JWT
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios request to API
        const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/remove`,
                {
                    conversationId: selectedConversation._id,
                },
                config
            ).catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        // refetch conversations
        getConversations();
        // unselect conversation
        setSelectedConversation(null);
    };

    return (
        <UserListCol>
            {/* form for group name in edit mode */}
            {editMode ? (
                <GroupNameForm onSubmit={submitEdit}>
                    <FormGroup>
                        <Form.FloatingLabel label="Group Name">
                            <FormControl
                                id="name"
                                type="text"
                                value={groupName}
                                onChange={handleChange}
                                placeholder="Group Name"
                                required
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                    <Col
                        as={Button}
                        xs={12}
                        md={6}
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Col>
                </GroupNameForm>
            ) : (
                <h2>{groupName}</h2>
            )}
            <Menu>
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
                    <IconButton
                        icon={MdMeetingRoom}
                        color="var(--darkgrey)"
                        action={() => {
                            leaveGroup();
                        }}
                    />
                )}
            </Menu>
            <UserRow>
                <UserCol>
                    {selectedConversationUsers &&
                        selectedConversationUsers.map((user, index) => (
                            <ContactSlab
                                contact={user}
                                key={index}
                                size="40px"
                                fontSize="14px"
                            />
                        ))}
                </UserCol>
            </UserRow>
        </UserListCol>
    );
};

const UserRow = styled(Row)`
    margin: 0;
    padding: 0;
`

const UserCol = styled(Col)`
    margin: 0;
    padding: 0;
`;

const Menu = styled(Row)`
    margin: 0;
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: space-around;
`

const GroupNameForm = styled(Form)`
    margin: 20px 0;
`

const FormControl = styled(Form.Control)`
    border: none;
    margin: 0;
    padding: 0;
`
const FormGroup = styled(Form.Group)`
    padding: 0;
    margin: 20px 0;
`

const UserListCol = styled(Col)`
    background-color: var(--midgrey);
    padding: 10px;
    margin: 0;
`;