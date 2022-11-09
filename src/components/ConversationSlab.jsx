import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";
import { useUser } from "../contexts/UserProvider";
import { useEffect } from "react";

export const ConversationSlab = ({ conversation, selected, onClick }) => {
    const { localUser } = useUser();

    const otherUser = conversation.users.find((user) => {
        return user.email !== localUser.email;
    });

    return (
        <Slab
            className="p-0 m-0"
            onClick={onClick ? () => onClick(conversation) : null}
            hover={selected ? "transparent" : "rgba(0, 0, 0, 0.1)"}
        >
            <Col sm={4}>
                <Avatar
                    url={otherUser.avatar}
                    bgc={selected ? "#f8f9fa" : "#ffc107"}
                />
            </Col>
            <Col className="flex-grow-1">
                <Row>
                    {otherUser.firstName} {otherUser.lastName}
                </Row>
                <Row>
                    <p className="text-muted">2 unread messages</p>
                </Row>
            </Col>
        </Slab>
    );
};

const Slab = styled(Row)`
    cursor: pointer;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        background-color: ${(props) => props.hover};
    }
`;
