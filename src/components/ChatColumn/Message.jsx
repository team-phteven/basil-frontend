import { useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import Avatar from "../Avatar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Message = ({ message }) => {

    const date = DateTime.fromISO(message.createdAt);
    
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
                    size="50px"
                    hideStatus={true}
                />
            </Col>
            <MessageContent className="d-flex flex-column m-0 flex-grow-1">
                <Row>
                    <MessageHeader>
                        {message.sender.firstName} {message.sender.lastName}{" "}
                        <TimeStamp>
                            {date.toRelativeCalendar()}{" "}
                            {date.toFormat("hh:mm a")}
                        </TimeStamp>
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
    box-sizing: border-box;
    overflow: hidden;
    padding: 0px 10px;
`;

const MessageBody = styled.p`
    display: inline;
    margin: 0;

`;

const TimeStamp = styled.span`
    font-size: 0.9rem;
    text-transform: capitalize;
    color: grey;
`;

const MessageContainer = styled(Row)`
    width: 100%
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    padding: 20px 10px 0px 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-wrap: break-word;
    &:hover{
        background: rgba(0,0,0,0.1);
    }
`

export default Message;
