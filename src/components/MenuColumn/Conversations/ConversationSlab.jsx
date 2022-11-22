// Packages
import { useEffect, useState } from "react";
import styled from "styled-components";
// Contexts
import { useUser } from "../../../contexts/UserProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";
// Custom Components
import Avatar from "../../GlobalComponents/Avatar";
import GroupAvatar from "../../GlobalComponents/GroupAvatar";
// BS Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const ConversationSlab = ({ conversation, selected, onHide }) => {
    const { localUser } = useUser();

    const {
        messageNotifications,
        setMessageNotifications,
        setSelectedConversation,
    } = useConversations();

    const otherUser = conversation.users.find((user) => {
        return user.email !== localUser.email;
    });

    const [notifications, setNotifications] = useState(0);

    useEffect(() => {
        const key = conversation._id;
        if (messageNotifications && messageNotifications[key])
            setNotifications(messageNotifications[key]);
    }, [messageNotifications]);

    // FUNCTION FOR SELECTING CONVERSATIONS
    function selectConversation() {
        setSelectedConversation(conversation);
        const key = conversation._id;
        setMessageNotifications({ ...messageNotifications, [key]: 0 });
        setNotifications(0);
        onHide && onHide();
    }

    return (
        <Slab
            onClick={selectConversation}
            background={selected ? "rgba(0, 0, 0, 0.1)" : "transparent"}
        >
            {" "}
            {conversation?.isGroupConversation ? (
                <Col xs="auto">
                    <GroupAvatar
                        hideStatus
                        users={conversation.users}
                        bgc={"var(--midgrey)"}
                    />
                </Col>
            ) : (
                <Col xs="auto">
                    {otherUser && (
                        <Avatar url={otherUser.avatar} bgc={"var(--midgrey)"} />
                    )}
                </Col>
            )}
            <NameCol>
                {conversation?.isGroupConversation ? (
                    <Row>
                        {conversation.groupName}
                    </Row>
                ) : (
                    <Row>
                        {otherUser &&
                            `${otherUser.firstName} ${otherUser.lastName}`}
                        {notifications > 0 && (
                            <Notification>{notifications}</Notification>
                        )}
                    </Row>
                )}
            </NameCol>
        </Slab>
    );
};

const NameCol = styled(Col)`
    flex-grow: 1;
`

const Notification = styled.div`
    width: 20px;
    height: 20px;
    color: white;
    padding: 0;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: red;
`;

const Slab = styled(Row)`
    margin: 0;
    padding: 0;
    cursor: pointer;
    background: ${(props) => props.background};
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default ConversationSlab
