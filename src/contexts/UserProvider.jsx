import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children, storedUser }) {
    const [localUser, setLocalUser] = useState(null);
    const [messageRequests, setMessageRequests] = useState(null);

    // Load user from local storage and set in context state
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        if (userData) setLocalUser(userData);
    }, []);

    // when local user changes get their
    useEffect(() => {
        if (localUser) getMessageRequests();
    }, [localUser])

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
                console.log(error_code);
                return;
            });
        setMessageRequests(data);
    };

    const values = {
        localUser,
        setLocalUser,
        messageRequests,
        setMessageRequests,
    };

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
}
