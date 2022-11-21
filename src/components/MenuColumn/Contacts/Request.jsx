// Packages
import styled from "styled-components";
import axios from "axios";
// Contexts
import { useUser } from "../../../contexts/UserProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";
// Custom Components
import Avatar from "../../GlobalComponents/Avatar";
import IconButton from "../../GlobalComponents/IconButton";
// BS Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Icons
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";

const Request = ({ request, localUser }) => {
    // destructure user provider
    const { 
        setMessageRequests, 
        getMessageRequests, 
        getContacts 
    } = useUser();

    // destructure conversation provider
    const { getConversations } = useConversations();

    // handle clicking accept request
    const handleAccept = async (acceptedId) => {
        // add JWT
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios request to API
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
        // set returned data as message requests
        setMessageRequests(data);
        // refetch conversations and contacts
        getConversations();
        getContacts()
    };

    // handle clicking reject request
    const handleReject = async (rejectedId) => {
        // add JWT
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios put request to API
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
        // refetch message requests
        getMessageRequests();
    };

    return (
        <StyledRow>
            <StyledCol xs="auto">
                <Avatar url={request.avatar} size="3rem" bgc="black" />
            </StyledCol>
            <StyledCol xs="auto">
                <span>
                    {request.firstName} {request.lastName}
                </span>
            </StyledCol>
            <ButtonCol>
                <ButtonRow>
                    <IconButton
                        as={Col}
                        icon={MdRemoveCircle}
                        color="red"
                        size="30px"
                        action={() => handleReject(request._id)}
                    ></IconButton>
                    <IconButton
                        as={Col}
                        icon={MdCheckCircle}
                        color="var(--green)"
                        size="30px"
                        action={() => handleAccept(request._id)}
                    ></IconButton>
                </ButtonRow>
            </ButtonCol>
        </StyledRow>
    );
};

const ButtonCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const ButtonRow = styled(Row)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: end;
    align-items: center;
    margin: 0;
    padding: 0;
    gap: 5px;
`

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-items: center;
`;

export default Request;
