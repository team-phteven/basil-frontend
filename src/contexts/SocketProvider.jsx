import React, { useContext, useEffect } from "react";
import { useUser } from "./UserProvider";
import { useConversations } from "./ConversationsProvider";
const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const { localUser } = useUser();

    const {
        selectedConversationMessages,
        selectedConversation,
        setSelectedConversationMessages,
    } = useConversations();

    const socket = io(process.env.REACT_APP_BASE_URL);

    // set-up socket on socket state change
    useEffect(() => {
        socket.on("connect", console.log("socket connected"));
        localUser && socket.emit("setup", localUser.email);
        selectedConversation &&
            socket.on("message received", (message) => updateMessages(message));
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        };
    }, [socket, selectedConversation, localUser]);

    const updateMessages = (message) => {
        console.log("selected" + selectedConversation._id);
        console.log("message" + message.conversation._id);
        message.conversation._id === selectedConversation._id
            ? setSelectedConversationMessages([
                  message,
                  ...selectedConversationMessages,
              ])
            : console.log("notify");
    };

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
