import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { ConversationSlab } from "./ConversationSlab";
import { useConversations } from "../../../contexts/ConversationsProvider";

const ConversationList = () => {

    const {
        selectedConversation,
        conversations,
    } = useConversations();


    return (
        <Col className="d-flex flex-column p-0 m-0">

            <Row
                style={{
                    overflow: "hidden",
                }}
                className="p-0 m-0 flex-grow-1"
            >
                <Stack className="p-0 m-0">
                    {selectedConversation &&
                        conversations.map((conversation, index) => (
                            <ConversationSlab
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