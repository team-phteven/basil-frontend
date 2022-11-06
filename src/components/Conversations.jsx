import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    const {
        storedUser,
        selectedConversationIndex,
        setSelectedConversationIndex,
    } = useConversations();

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
                {conversations.map((conversation, index) => {
                    const otherUser = conversation.users.find((user) => {
                        return user.email !== storedUser.email;
                    });
                    return (
                        <ListGroup.Item
                            action
                            onClick={() => setSelectedConversationIndex(index)}
                            active={index === selectedConversationIndex}
                            key={conversation._id}
                        >
                            <span className="me-1">{otherUser.firstName}</span>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default Conversations;
