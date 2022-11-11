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
        otherConversations,
    } = useConversations();


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
                        <p>{selectedConversation && selectedConversation._id}</p>
                </Stack>
            </Row>
        </Col>
    );
};

export default ConversationList;
