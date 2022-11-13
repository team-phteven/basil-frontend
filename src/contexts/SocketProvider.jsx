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
        messageNotifications,
        setMessageNotifications,
    } = useConversations();

    const socket = io(process.env.REACT_APP_BASE_URL);

    // set-up socket on socket state change
    useEffect(() => {
        socket.on("connect", () => {
            console.log("socket connected")
            // docs say to move this outside of the .on, however it fixes an error in the setup
            localUser && socket.emit("setup", localUser.email);
        });
        selectedConversation &&
            socket.on("message received", (message) => updateMessages(message));
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        };
    }, [socket, localUser]);

    const updateMessages = (message) => {

        if (message.conversation._id === selectedConversation._id) {
            setSelectedConversationMessages([
                message,
                ...selectedConversationMessages,
            ]);
        } else {
            const key = message.conversation._id
            messageNotifications.hasOwnProperty(key)
                ? setMessageNotifications({
                      ...messageNotifications,
                      [key]: messageNotifications[key] + 1,
                  })
                : setMessageNotifications({
                      ...messageNotifications,
                      [key]: 1,
                  });
        }
    };

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
