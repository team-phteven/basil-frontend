import React, {  useState, useContext } from "react";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children, storedUser }) {

    const [localUser, setLocalUser] = useState(null)


    const values={ localUser,  setLocalUser}

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}
