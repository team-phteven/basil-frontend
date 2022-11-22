// Packages
import { DateTime } from "luxon";
import styled from "styled-components";
// Custom Components
import Avatar from "../GlobalComponents/Avatar";
// BS Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Message = ({ message }) => {

    // create an instance of DateTime for message createdAt
    const date = DateTime.fromISO(message.createdAt);
    
    return (
        <MessageContainer>
            <AvatarCol
                xs="auto"
            >
                <Avatar
                    url={message.sender.avatar}
                    bgc={"#f8f9fa"}
                    size="50px"
                    hideStatus={true}
                />
            </AvatarCol>
            <MessageContent>
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

const AvatarCol = styled(Col)`
    padding: 0;
`

const MessageHeader = styled.p`
    margin-bottom: 0px;
    overflow-wrap: break-word;
`;

const MessageContent = styled(Col)`
    margin: 0;
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
    overflow: hidden;
    padding: 20px 10px 0px 10px;
    &:hover{
        background: rgba(0,0,0,0.05);
    }
`

export default Message;
