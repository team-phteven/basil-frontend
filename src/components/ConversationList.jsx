import { useEffect, useState } from "react";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { ConversationSlab } from "../components/ConversationSlab";
import { useConversations } from "../contexts/ConversationsProvider";
import { useUser } from "../contexts/UserProvider";
import axios from "axios";

const ConversationList = () => {
    const { conversations, setConversations, selectedConversation, setSelectedConversation } = useConversations();
    const { localUser } = useUser()

    const [otherConversations, setOtherConversations] = useState(null);

    const getConversations = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/conversations`, config)
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setConversations(data);
    };

    useEffect(() => {
        getConversations();
    }, []);

    useEffect(() => {
        console.log('setting')
        setSelectedConversation(conversations[0])
        console.log(conversations)
    }, [conversations])

    useEffect(() => {
        setOtherConversations(
            conversations.filter(conversation => {
                return conversation._id !== selectedConversation._id})
                );
    }, [selectedConversation])

    return (
        <Col className="d-flex flex-column">

            {/* SELECTED CONVERSATION */}

            {selectedConversation && <ConversationSlab conversation={selectedConversation} selected={true}/>}

            {/* ALL OTHER CONVERSATIONS */}
            
            <Row
                style={{
                    borderTopRightRadius: "60px",
                    overflow: "hidden",
                }}
                className="p-0 m-0 bg-warning flex-grow-1"
            >
                <Stack className="p-0 m-0">
                    {otherConversations && 
                    otherConversations.map((conversation, index) => (
                        <ConversationSlab
                            key={index}
                            conversation={conversation}
                            selected={false}
                        />
                    ))}

                </Stack>
            </Row>
        </Col>
    );
};

export default ConversationList;
