import { useEffect } from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Col from "react-bootstrap/Col";

const Message = ({ message }) => {

    return (
        <Container >
            <Avatar url={message.sender.avatar} bgc={"#f8f9fa"} />
            <Col>
                <p>{message.sender.firstName} {message.sender.lastName} {message.createdAt}</p>
                <p>{message.content}</p>
            </Col>
        </Container>
    );
};

const Container = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
`;

export default Message;
