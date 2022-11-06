import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

// passing in storedUser from App
export function ContactsProvider({ children, storedUser }) {
    // const [requestsMade, setRequestsMade] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    // const [incomingRequests, setIncomingRequests] = useState([]);

    return (
        <ContactsContext.Provider value={{ storedUser }}>
            {children}
        </ContactsContext.Provider>
    );
}
