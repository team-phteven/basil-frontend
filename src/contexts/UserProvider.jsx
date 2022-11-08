import React, {  useState, useContext } from "react";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children, storedUser }) {

    const [localUser, setLocalUser] = useState(null)
    const [messageRequests, setMessageRequests] = useState(null);


    const values = {
        localUser,
        setLocalUser,
        messageRequests,
        setMessageRequests,
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}
