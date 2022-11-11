import React, { useContext, useEffect, useState } from "react";
const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ localUser, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_BASE_URL);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [localUser]);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
