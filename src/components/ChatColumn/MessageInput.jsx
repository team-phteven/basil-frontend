// Packages
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import autosize from "autosize";
// Contexts
import { useSocket } from "../../contexts/SocketProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
// BS Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MessageInput = ({ selectedConversation, localUser }) => {

    // get socket from socket provider
    const socket = useSocket();

    // destructured from conversations context
    const {
        setSelectedConversation,
        setSelectedConversationMessages,
        selectedConversationMessages,
    } = useConversations();

    // input state for message
    const [inputMessage, setInputMessage] = useState("");
    // loading state for message input
    const [loading, setLoading] = useState(false);

    // handle the change of input message
    const handleChange = (e) => {
        setInputMessage(e.target.value);
    };

    // handle clicking the send button
    const handleClick = (e) => {
        e.preventDefault();
        sendMessage();
    };
    // handle pressing enter on the keyboard
    // hold shift to create new line instead of send
    const enterSend = (event) => {
        if (event.key === "Enter" && !event.shiftKey && focusedInput) {
            event.preventDefault();
            sendMessage();
        }
    };

    // API Send message request
    const sendMessage = async () => {
        setLoading(true)
        // message object
        const newMessage = {
            content: inputMessage,
            conversationId: selectedConversation._id,
        };
        // config with JWS token
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // axios request
        const { data } = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/api/messages`,
                newMessage,
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                setLoading(false)
                return;
            });
        // reset input
        setInputMessage("");
        // update messages in local state
        setSelectedConversationMessages([
            data,
            ...selectedConversationMessages,
        ]);
        // send message over socket
        socket.emit("new message", data);
        setLoading(false);
    };

    // ---------- AUTOSIZE ---------- 

    // initiate the autosize function on the textarea
    const ta = document.querySelector("textarea");
    autosize(ta);

    // handle the automatic grow and shrink of vertical height as text changes
    useEffect(() => {
        autosize.update(ta);
    }, [inputMessage]);

    //---------- TIMER ----------

    // input focus state for timer
    const [focusedInput, setFocusedInput] = useState(false);
    // active seconds state for timer
    const [activeSeconds, setActiveSeconds] = useState(0);

    // new ref
    let id = useRef();

    // clear interval for timer
    useEffect(() => {
        return () => clearInterval(id.current);
    }, []);

    // start timer by setting interval
    const startTimer = () => {
        id.current = setInterval(() => {
            setActiveSeconds((prev) => prev + 1);
        }, 1000);
    };

    // stop timer and send data to API
    const endTimer = async () => {
        clearInterval(id.current);
        // add JWS Token
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        // make axios put request
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
        // update selected conversation state with new time
        setSelectedConversation({
            ...selectedConversation,
            billableSeconds: {
                ...data.billableSeconds,
                [localUser._id]: data.billableSeconds[localUser._id],
            },
        });
        // reset active seconds
        setActiveSeconds(0);
    };

    return (
        <Form style={{ display: "relative" }} className="m-0 p-0">
            <InputWrapper>
                <InputGroup>
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
                <SendButton disabled={loading} onClick={handleClick} type="submit">
                    Send
                </SendButton>
            </InputWrapper>
        </Form>
    );
};

const InputWrapper = styled(Form.Group)`
    padding: 0;
    overflow: auto;
    display: flex;
    flex-direction: row;
`;

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
