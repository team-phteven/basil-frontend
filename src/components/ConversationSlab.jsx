import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";
import { useUser } from "../contexts/UserProvider";

export const ConversationSlab = ({conversation, selected}) => {

    const isSelected = selected ? true : false;

    const { localUser } = useUser();

    const otherUser = conversation.users.find((user) => {
        return user.email !== localUser.email;
    });

    return (
        <Row
            style={{ height: "100px" }}
            className="p-2 m-0 d-flex justify-items-start"
        >
            <Col>
                <Avatar url={otherUser.avatar} />
            </Col>
            <Col>
                <Row>
                    {otherUser.firstName} {otherUser.lastName}
                </Row>
                <Row>
                    <p className="text-muted">2 unread messages</p>
                </Row>
            </Col>
        </Row>
    );
};
