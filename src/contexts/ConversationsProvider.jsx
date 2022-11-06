import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

// passing in storedUser from App
export function ConversationsProvider({ children, storedUser }) {
    // const [requestsMade, setRequestsMade] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    // const [incomingRequests, setIncomingRequests] = useState([]);

    return (
        <ConversationsContext.Provider value={{ storedUser }}>
            {children}
        </ConversationsContext.Provider>
    );
}
