import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageInput from "./MessageInput";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import MessageList from "./MessageList";
import styled from "styled-components";

const OpenConversation = () => {
    const { localUser } = useUser();

    const { selectedConversation } = useConversations();

    return (
        <Row className="m-0 p-0">
            <Col className="vh-100 d-flex flex-column p-1">
                <StyledRow className="m-0 flex-grow-1">
                    <MessageList />
                </StyledRow>
                <MessageInputRow className="m-0 p-0">
                    <MessageInput
                        selectedConversation={selectedConversation}
                        localUser={localUser}
                    />
                </MessageInputRow>
            </Col>
        </Row>
    );
};

const StyledRow = styled(Row)`
    flex-direction: column-reverse;
    overflow-y: scroll;
    width: 100%;
    margin: 0;
`

const MessageInputRow = styled(Row)`

`

export default OpenConversation;
