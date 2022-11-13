import { useEffect } from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Message = ({ message }) => {
    return (
        <MessageContainer>
            <Col
                xs="auto"
                style={{ overflowWrap: "break-word" }}
                className="m-0 d-flex flex-column m-0 p-0"
            >
                <Avatar
                    url={message.sender.avatar}
                    bgc={"#f8f9fa"}
                    className="m-0 p-0"
                />
            </Col>
            <MessageContent className="d-flex flex-column m-0 p-0 flex-grow-1">
                <Row>
                    <MessageHeader>
                        {message.sender.firstName} {message.sender.lastName}{" "}
                        {message.createdAt}
                    </MessageHeader>
                </Row>
                <Row>
                    <MessageBody>{message.content}</MessageBody>
                </Row>
            </MessageContent>
        </MessageContainer>
    );
};

const MessageHeader = styled.p`
    margin-bottom: 0px;
`;

const MessageContent = styled(Col)`
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
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-wrap: break-word;
`;

export default Message;
