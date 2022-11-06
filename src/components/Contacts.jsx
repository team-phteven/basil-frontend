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

    return (
        <div style={{ color: "red" }}>
            <p>Conversation Requests</p>
            <ListGroup>
                {incomingRequests.map((user) => {
                    return (
                        <ListGroup.Item>
                            <span className="me-1">{user.email}</span>
                            <ButtonGroup size="sm">
                                <Button variant="secondary">Accept</Button>
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
