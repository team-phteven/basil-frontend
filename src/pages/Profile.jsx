import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../contexts/UserProvider";
import ConversationList from "../components/ConversationList";

const Profile = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    const { localUser } = useUser();

    return (
        <Container as="main" className="mx-0 p-0 vh-100 bg-light" fluid>
            <Row className="h-100 m-0 p-0">
                {/* CONVERSATIONS COLUMN */}

                <Col
                    style={{ boxSizing: "border-box" }}
                    className="bg-transparent w-100 m-0 p-0 d-flex flex-column"
                >
                    <Row className="flex-grow-1">
                        <ConversationList />
                    </Row>

                    {/* Menu */}
                    <Row style={{ height: "100px" }} className="p-0 m-0">
                        <Avatar url={localUser.avatar} />
                        <Button
                            className="ms-auto w-50 h-50"
                            onClick={handleClick}
                        >
                            Log Out
                        </Button>
                    </Row>
                </Col>
                {/* CHAT COLUMN */}
                <Col className="w-100 m-0 p-0 bg-transparent"></Col>
                {/* IN-CHAT CONTACTS */}
                <Col className="bg-secondary w-100 m-0 p-0"></Col>
            </Row>
        </Container>
    );
};

export default Profile;
