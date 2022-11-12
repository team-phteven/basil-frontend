import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { ConversationSlab } from "../components/ConversationSlab";
import { useConversations } from "../contexts/ConversationsProvider";

const ConversationList = () => {

    const {
        selectedConversation,
        setSelectedConversation,
        conversations
    } = useConversations();


    // FUNCTION FOR SELECTING CONVERSATIONS
    function selectConversation(conversation) {
        setSelectedConversation(conversation);
    }

    return (
        <Col className="d-flex flex-column p-0 m-0">

            <Row
                style={{
                    overflow: "hidden",
                }}
                className="p-0 m-0 bg-warning flex-grow-1"
            >
                <Stack className="p-0 m-0">
                    {selectedConversation &&
                        conversations.map((conversation, index) => (
                            <ConversationSlab
                                onClick={selectConversation}
                                key={index}
                                conversation={conversation}
                                selected={conversation._id == selectedConversation._id}
                            />
                        ))}
                </Stack>
            </Row>
        </Col>
    );
};

export default ConversationList;
