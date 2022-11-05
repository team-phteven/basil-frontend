import React, { useContext } from "react";
const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    // const [requestsMade, setRequestsMade] = useState([]);

    return (
        <ContactsContext.Provider value={{}}>
            {children}
        </ContactsContext.Provider>
    );
}
