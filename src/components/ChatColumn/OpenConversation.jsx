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
            <StyledCol className="vh-100 d-flex flex-column">
                <StyledRow className="m-0 flex-grow-1">
                    <MessageList />
                </StyledRow>
                <MessageInputRow className="m-0">
                    <MessageInput
                        selectedConversation={selectedConversation}
                        localUser={localUser}
                    />
                </MessageInputRow>
            </StyledCol>
        </Row>
    );
};

const StyledRow = styled(Row)`
    flex-direction: column-reverse;
    overflow-y: scroll;
    width: 100%;
    margin: 0;
`

const StyledCol = styled(Col)`
    padding: 0px 5px 0px 0px;
`

const MessageInputRow = styled(Row)`
    padding: 0 0 10px 10px;
`

export default OpenConversation;
