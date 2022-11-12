import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";
import { useUser } from "../contexts/UserProvider";

export const ConversationSlab = ({ conversation, selected, onClick }) => {
    const { localUser } = useUser();

    const otherUser = conversation.users.find((user) => {
        return user.email !== localUser.email;
    });

    return (
        <Slab
            className="p-0 m-0"
            onClick={onClick ? () => onClick(conversation) : null}
            background={selected ? "rgba(0, 0, 0, 0.1)" : "transparent"}
        >
            <Col sm={4}>
                {otherUser && (
                    <Avatar
                        url={otherUser.avatar}
                        bgc={"#ffc107"}
                    />
                )}
            </Col>
            <Col className="flex-grow-1">
                <Row>
                    {otherUser && (
                        <p>
                            {otherUser.firstName} {otherUser.lastName}
                        </p>
                    )}
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
    background: ${(props) => props.background};
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
