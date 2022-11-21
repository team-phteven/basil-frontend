// Packages
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
// Contexts
import { useUser } from "../../../contexts/UserProvider";
// Custom Components
import ContactSlab from "../../GlobalComponents/ContactSlab";
import Request from "./Request";
// BS Components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
// Icons
import { MdOutlinePersonAddAlt, MdRefresh } from "react-icons/md";


const Contacts = () => {
    // destructure user provider
    const { localUser, 
        messageRequests, 
        getMessageRequests, 
        contacts } = useUser();

    // state for add contact input 
    const [input, setInput] = useState("");
    // state for form feedback
    const [feedback, setFeedback] = useState("");
    // state for form validation
    const [validity, setValidity] = useState("");

    // handle add contact click
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
        // add JWT
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios put request
        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/users/add-request`,
                { email: input },
                config

                )
                .catch((error) => {
                    // set invalid feedback
                    setFeedback(JSON.stringify(error.response.data.error).replace(/\"/g, ""));
                    setValidity(false);
                    return;
                });
            // set valid feedback and reset input
            setFeedback("Request sent")
            setValidity(true)
            setInput("")
    };

    return (
        <ContactsCol>
            <h2>Contacts</h2>
            
            {/* MESSAGE REQUESTS */}
            <ContactsRow>
                <Stack as={Col} gap={3}>
                    <Row xs="auto">
                        <Heading>Message Requests</Heading>
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
            </ContactsRow>

            {/* SEND REQUEST FORM */}
            <ContactsRow>
                <Heading>Add Contact</Heading>
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
            </ContactsRow>

            {/* CONTACT LIST */}
            <ContactsRow>
                <Heading>Contacts</Heading>
                {contacts?.map((contact, index) => (
                    <ContactSlab key={index} contact={contact} />
                ))}
                {!contacts[0] && <span>No Contacts</span>}
            </ContactsRow>
        </ContactsCol>
    );
};

const Heading = styled.h3`
    font-size: 20px;
`

const ContactsRow = styled(Row)`
    margin: 40px 0;
`

const ContactsCol = styled(Col)`
    background: var(--darkgrey);
    padding: 10px;
    color: var(--lightgrey);
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