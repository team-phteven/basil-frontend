import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children, storedUser }) {
    const [localUser, setLocalUser] = useState(null);
    const [messageRequests, setMessageRequests] = useState(null);
    const [contacts, setContacts] = useState(null);

    // Load user from local storage and set in context state
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        if (userData) setLocalUser(userData);
    }, []);

    // when local user changes get their
    useEffect(() => {
        if (localUser) getMessageRequests();
        if (localUser) getContacts();
    }, [localUser]);

    // get message requests for logged in user
    const getContacts = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        const { data } = await axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/api/users/get-contacts`,
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                return;
            });
        setContacts(data.contacts);
    };

    // get message requests for logged in user
    const getMessageRequests = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        const { data } = await axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/api/users/get-requests`,
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                return;
            });
        setMessageRequests(data);
    };

    const values = {
        localUser,
        setLocalUser,
        messageRequests,
        setMessageRequests,
        getMessageRequests,
        getContacts,
        setContacts,
        contacts,
        getContacts
    };

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
}
