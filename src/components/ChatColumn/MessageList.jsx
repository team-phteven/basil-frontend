import Stack from 'react-bootstrap/Stack'
import Message from './Message'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const MessageList = ({ messages }) => {

    return (
        <Stack as={StyledCol} gap={4} className="p-0">
            {messages && messages.map((message, index) => <Message key={index} message={message} />)}
        </Stack>
    );
};

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column-reverse;
`

export default MessageList