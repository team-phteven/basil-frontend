import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    const { storedUser } = useConversations();
    useEffect(() => {
        const getConversations = async () => {
            const response = await fetch(
                "http://localhost:5000/api/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            const json = await response.json();
            setConversations(json);
        };
        getConversations();
    }, []);
    return (
        <div style={{ color: "red" }}>
            <ListGroup>
                {conversations.map((conversation) => {
                    const otherUser = conversation.users.find((user) => {
                        return user._id !== storedUser._id;
                    });
                    return (
                        <ListGroup.Item>
                            <span className="me-1">{otherUser.firstName}</span>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default Conversations;
