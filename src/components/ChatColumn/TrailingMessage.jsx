import { useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TrailingMessage = ({ message }) => {
    const date = DateTime.fromISO(message.createdAt);

    return (
        <MessageContainer>
            <MessageContent className="d-flex flex-column m-0 flex-grow-1">
                <Row>
                    <MessageBody>{message.content}</MessageBody>
                </Row>
            </MessageContent>
        </MessageContainer>
    );
};



const MessageContent = styled(Col)`
    box-sizing: border-box;
    overflow: hidden;
    padding: 0px 0px 0px 70px;
`;

const MessageBody = styled.p`
    display: inline;
    margin: 0;
`;

const MessageContainer = styled(Row)`
    width: 100%
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    padding: 0px;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-wrap: break-word;
    &:hover{
        background: rgba(0,0,0,0.1);
    }
`;

export default TrailingMessage;
