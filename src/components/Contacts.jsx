import React, { useEffect, useState } from "react";
import { ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

const Contacts = () => {
    const [incomingRequests, setIncomingRequests] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    const { storedUser } = useContacts();
    useEffect(() => {
        const getRequests = async () => {
            const response = await fetch(
                "http://localhost:5000/api/users/get-requests",
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            const json = await response.json();
            setIncomingRequests(json);
        };
        getRequests();
    }, []);

    const handleAccept = async (id) => {
        console.log(id);
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/accept-request",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        contactId: id,
                        isGroupConversation: false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            const json = await response.json();
            console.log(json);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div style={{ color: "red" }}>
            <p>Conversation Requests</p>
            <ListGroup>
                {incomingRequests.map((user, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <span className="me-1">{user.email}</span>
                            <ButtonGroup size="sm">
                                <Button
                                    onClick={() => handleAccept(user._id)}
                                    variant="secondary"
                                >
                                    Accept
                                </Button>
                                <Button variant="warning">Reject</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default Contacts;
