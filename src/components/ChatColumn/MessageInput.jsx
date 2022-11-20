import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import axios from "axios";
import { useSocket } from "../../contexts/SocketProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
import autosize from "autosize";

const MessageInput = ({ selectedConversation, localUser }) => {
    const [focusedInput, setFocusedInput] = useState("false");
    const [inputMessage, setInputMessage] = useState("");
    const [activeSeconds, setActiveSeconds] = useState(0);
    const { getConversations, setSelectedConversation, setSelectedConversationMessages, selectedConversationMessages } =
        useConversations();

    const handleClick = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const ta = document.querySelector("textarea");

    autosize(ta);

    const handleChange = (e) => {
        setInputMessage(e.target.value);
    };

    useEffect(() => {
        autosize.update(ta);
    }, [inputMessage]);

    const enterSend = (event) => {
        if (event.key === "Enter" && !event.shiftKey && focusedInput) {
            event.preventDefault();
            sendMessage();
        }
    };

    const socket = useSocket();

    const sendMessage = async () => {
        const newMessage = {
            content: inputMessage,
            conversationId: selectedConversation._id,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/api/messages`,
                newMessage,
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setInputMessage("");
        setSelectedConversationMessages([
            data,
            ...selectedConversationMessages,
        ]);
        socket.emit("new message", data);
    };

    // logic for time tracking ---- vv
    useEffect(() => {
        return () => clearInterval(id.current);
    }, []);

    let id = useRef();

    const startTimer = () => {
        id.current = setInterval(() => {
            setActiveSeconds((prev) => prev + 1);
            console.log(activeSeconds);
        }, 1000);
    };

    const endTimer = async () => {
        clearInterval(id.current);

        // sending request for incrementing time
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .put(
                `${process.env.REACT_APP_BASE_URL}/api/conversations/add-seconds`,
                {
                    seconds: activeSeconds,
                    conversationId: selectedConversation._id,
                },
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        console.log(data);
        setSelectedConversation({...selectedConversation, billableSeconds: {...data.billableSeconds, [(localUser._id)]: data.billableSeconds[(localUser._id)]}})
        setActiveSeconds(0);
    };
    // logic for time tracking ---- ^^

    return (
        <Form style={{ display: "relative" }} className="m-0 p-0">
            <InputFieldWrapper
                className="p-0 d-flex"
                style={{ overflow: "auto" }}
            >
                <InputGroup>
                    {/* TO-DO - autoresize textarea with typing extra lines */}
                    <TextBox
                        onFocus={() => {
                            startTimer();
                            setFocusedInput(true);
                        }}
                        onBlur={() => {
                            endTimer();
                            setFocusedInput(false);
                        }}
                        as="textarea"
                        onKeyDown={enterSend}
                        value={inputMessage}
                        onChange={handleChange}
                        rows={1}
                        placeholder="message..."
                    />
                </InputGroup>
                <SendButton onClick={handleClick} type="submit">
                    Send
                </SendButton>
            </InputFieldWrapper>
        </Form>
    );
};

const InputFieldWrapper = styled(Form.Group)``;

const TextBox = styled(Form.Control)`
    width: 100%;
    border: 0;
    outline: 0;
    background: var(--midgrey);
    padding: 5px;
    max-height: 50vh;
    border-radius: 10px;
`;

const SendButton = styled(Button)`
    height: 35px;
    border-radius: 20px;
    margin: 5px;
    align-self: end;
    color: white;
`;

export default MessageInput;
