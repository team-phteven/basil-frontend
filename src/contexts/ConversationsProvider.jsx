import React, { useState, useContext } from "react";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedConversationMessages, setSelectedConversationMessages] =
        useState([]);

    const values = {
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        selectedConversationMessages,
        setSelectedConversationMessages,
    };

    return (
        <ConversationsContext.Provider value={values}>
            {children}
        </ConversationsContext.Provider>
    );
}
