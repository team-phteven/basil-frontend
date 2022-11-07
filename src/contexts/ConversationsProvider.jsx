import React, {  useState, useContext } from "react";

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {

    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null);

    const values={ conversations,  setConversations, selectedConversation, setSelectedConversation}

    return (
        <ConversationsContext.Provider value={values}>
            {children}
        </ConversationsContext.Provider>
    );
}
