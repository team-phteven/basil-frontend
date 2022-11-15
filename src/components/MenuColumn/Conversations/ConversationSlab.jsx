import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "../../GlobalComponents/Avatar";
import { useUser } from "../../../contexts/UserProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";
import { useEffect, useState } from "react";


export const ConversationSlab = ({ conversation, selected, onClick }) => {
    const { localUser } = useUser();

    const {
        messageNotifications,
        setMessageNotifications,
        setSelectedConversation
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
    }

    return (
        <Slab
            className="p-0 m-0"
            onClick={selectConversation}
            background={selected ? "rgba(0, 0, 0, 0.1)" : "transparent"}
        >
            <Col sm={4}>
                {otherUser && <Avatar url={otherUser.avatar} bgc={"var(--midgrey)"} />}
            </Col>
            <Col className="flex-grow-1">
                <Row>
                    {otherUser &&
                        `${otherUser.firstName} ${otherUser.lastName}`}
                    {notifications > 0 && (
                        <Notification>{notifications}</Notification>
                    )}
                </Row>
            </Col>
        </Slab>
    );
};

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
`

const Slab = styled(Row)`
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
