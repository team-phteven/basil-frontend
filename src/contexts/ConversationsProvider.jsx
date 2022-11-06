import React, { useContext, useState, useEffect } from "react";
const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

// passing in storedUser from App
export function ConversationsProvider({ children, storedUser }) {
    // const [requestsMade, setRequestsMade] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    // const [incomingRequests, setIncomingRequests] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] =
        useState(0);

    return (
        <ConversationsContext.Provider
            value={{
                storedUser,
                selectedConversationIndex,
                setSelectedConversationIndex,
            }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}
