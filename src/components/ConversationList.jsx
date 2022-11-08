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
    const {
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        setSelectedConversationMessages,
    } = useConversations();
    const { localUser } = useUser();
    const [otherConversations, setOtherConversations] = useState(null);

    // FETCH CONVERSATIONS FROM DB
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

    // GET CONVERSATIONS ON COMPONENT LOAD
    useEffect(() => {
        getConversations();
    }, []);

    // SELECT THE FIRST CONVERSATION IN ARRAY
    // TO-DO: CONVERSATION WITH MOST RECENT MESSAGE SHOULD BE SELECTED
    useEffect(() => {
        setSelectedConversation(conversations[0]);
    }, [conversations]);

    // ALL OTHER (NON-SELECTED) CONVERSATIONS ARE SET
    useEffect(() => {
        setOtherConversations(
            conversations.filter((conversation) => {
                return conversation._id !== selectedConversation._id;
            })
        );
        if (selectedConversation) getMessages();
    }, [selectedConversation]);

    const getMessages = async () => {
        // GET MESSAGES FOR SELECTED CONVERSATION AND STORE THEM IN STATE
        console.log("getMessages called: -----");
        console.log("selectedConversation: -----" + selectedConversation._id);
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        const { data } = await axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/messages`, config, {
                conversationId: selectedConversation._id,
            })
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setSelectedConversationMessages(data);
    };

    // FUNCTION FOR SELECTING CONVERSATIONS
    function selectConversation(conversation) {
        setSelectedConversation(conversation);
    }

    return (
        <Col className="d-flex flex-column p-0 m-0">
            {/* SELECTED CONVERSATION */}

            {selectedConversation && (
                <ConversationSlab
                    conversation={selectedConversation}
                    selected
                />
            )}

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
                                onClick={selectConversation}
                                key={index}
                                conversation={conversation}
                            />
                        ))}
                </Stack>
            </Row>
        </Col>
    );
};

export default ConversationList;
