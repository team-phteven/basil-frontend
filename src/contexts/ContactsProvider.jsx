import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    // const [requestsMade, setRequestsMade] = useState([]);

    const [incomingRequests, setIncomingRequests] = useState([]);

    useEffect(() => {
        const getRequests = async () => {
            const response = await fetch(
                "http://localhost:5000/api/users/add-request",
                {
                    method: "PUT",
                    body: JSON.stringify({ email: emailRef.current.value }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
        };
    }, []);

    return (
        <ContactsContext.Provider value={{}}>
            {children}
        </ContactsContext.Provider>
    );
}
