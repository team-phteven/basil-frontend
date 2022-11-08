import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useConversations } from "../contexts/ConversationsProvider";
import { useUser } from "../contexts/UserProvider";

const Contacts = () => {
    const { conversations } = useConversations();
    const { localUser } = useUser();
    const [input, setInput] = useState("");

    const getContactInfo = (conversation) => {
        const otherUser = conversation.users.find((user) => {
            return user.email !== localUser.email;
        });
        return otherUser;
    };

    const handleClick = async () => {
        console.log(input)
        setInput("");
    };

    useEffect(() => {
        console.log(conversations);
    }, [conversations]);

    return (
        <ContactsCol className="p-2 bg-black text-white">
            <h3>Contacts</h3>

            <h4>Message Requests</h4>
            <span>You have no requests.</span>
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

            <h4>Contacts</h4>

            {conversations &&
                conversations.map(
                    (conversation, index) =>
                        getContactInfo(conversation).firstName
                )}
        </ContactsCol>
    );
};

const ContactsCol = styled(Col)``;

export default Contacts;
