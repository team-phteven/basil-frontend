import styled from "styled-components";
import Avatar from "../../GlobalComponents/Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import axios from "axios";
import { useUser } from "../../../contexts/UserProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";

const Request = ({ request, localUser }) => {
    const { setMessageRequests, getMessageRequests, getContacts } = useUser();
    const { getConversations } = useConversations();


    const handleAccept = async (acceptedId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/api/conversations`,
                { users: [acceptedId] },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setMessageRequests(data);
        getConversations();
        getContacts()
    };

    const handleReject = async (rejectedId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/users/decline-request`,
                { contactId: rejectedId },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        getMessageRequests();
    };

    return (
        <StyledRow>
            <Col
                xs="auto"
                className="d-flex flex-column justify-content-center"
            >
                <Avatar url={request.avatar} size="3rem" bgc="black" />
            </Col>
            <Col
                xs="auto"
                className="d-flex flex-column justify-content-center"
            >
                <span>
                    {request.firstName} {request.lastName}
                </span>
            </Col>
            <Col className="">
                <Row className="d-flex flex-row p-0 m-0 flex-nowrap justify-content-end">
                    <MdRemoveCircle
                        as={Col}
                        color="red"
                        size="30px"
                        onClick={() => handleReject(request._id)}
                        className="m-1 p-0"
                        style={{ width: "inherit", cursor: "pointer" }}
                    ></MdRemoveCircle>
                    <MdCheckCircle
                        as={Col}
                        color="var(--green)"
                        size="30px"
                        onClick={() => handleAccept(request._id)}
                        className="m-1 p-0"
                        style={{ width: "inherit", cursor: "pointer" }}
                    ></MdCheckCircle>
                </Row>
            </Col>
        </StyledRow>
    );
};


const StyledRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-items: center;
`;

export default Request;
