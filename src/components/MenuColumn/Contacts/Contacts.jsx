import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import { MdOutlinePersonAddAlt, MdRefresh } from "react-icons/md";
import { useConversations } from "../../../contexts/ConversationsProvider";
import { useUser } from "../../../contexts/UserProvider";
import Request from "./Request";
import Stack from "react-bootstrap/Stack";
import axios from "axios";
import { ContactSlab } from "../../GlobalComponents/ContactSlab";
import Button from "react-bootstrap/Button";


const Contacts = () => {
    const { localUser, messageRequests, getMessageRequests, contacts } = useUser();
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const [validity, setValidity] = useState("");

    const handleClick = async () => {

        // handle blank field
        if (input == "") {
            setValidity(false)
            setFeedback("Field cannot be empty")
            return;
        }
        // handle invalid email
        if (!input.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setValidity(false);
            setFeedback("Please enter a valid email address");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        console.log("input:" + input);
        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/users/add-request`,
                { email: input },
                config

                )
                .catch((error) => {
                    setFeedback(JSON.stringify(error.response.data.error).replace(/\"/g, ""));
                    setValidity(false);
                    return;
                });
            setFeedback("Request sent")
            setValidity(true)
            setInput("")
    };

    return (
        <ContactsCol className="p-2 text-white">
            <h3>Contacts</h3>


            <Row className="my-4">
                <Stack as={Col} gap={3}>
                    <Row xs="auto">
                        <h4>Message Requests</h4>
                        <StyledIcon
                            as={MdRefresh}
                            onClick={getMessageRequests}
                        />
                    </Row>
                    {messageRequests?.map((request, index) => {
                        return (
                            <Request
                                key={index}
                                request={request}
                                localUser={localUser}
                            />
                        );
                    })}
                </Stack>
                {!messageRequests[0] && <span>No message requests</span>}
            </Row>
            <Row>
                <h4>Add Contact</h4>
                <InputGroup size="lg">
                    <Form.Control
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <InputGroup.Text
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                    >
                        <MdOutlinePersonAddAlt />
                    </InputGroup.Text>
                </InputGroup>
                <p className={validity ? "text-success" : "text-danger"}>
                    {feedback}
                </p>
            </Row>
            <Row>
                <h4>Contacts</h4>
                {contacts?.map((contact, index) => (
                    <ContactSlab key={index} contact={contact} />
                ))}
                {!contacts[0] && <span>No Contacts</span>}
            </Row>
        </ContactsCol>
    );
};

const ContactsCol = styled(Col)`
    background: var(--darkgrey);
`

const StyledIcon = styled(Button)`
height: ${(props) => props.size || "30px"};
color: ${(props) => props.color || "white"};
cursor: pointer;
transition: 0.5s;
&:hover {
    transform: rotate(180deg);
    color: var(--violet);
}
`;

export default Contacts;