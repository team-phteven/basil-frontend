import React, { useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";
const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    
    const { localUser } = useUser();

    useEffect(() => {
        setSocket(io(process.env.REACT_APP_BASE_URL));

    }, []);

    // set-up socket on socket state change
    useEffect(() => {
        if (socket) socket.on("connect", connectSocket());
        if (localUser) socket.emit("setup", localUser.email);

        return () => {
            if (socket) socket.disconnect();
            console.log("socket disconnected");
        };
    }, [socket]);

    const connectSocket = () => {
        console.log("socket connected");
    };

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
