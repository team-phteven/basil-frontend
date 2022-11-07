import { useState, useEffect } from "react";
import { useUser } from "./contexts/UserProvider";
import "./App.css";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {

    const { setLocalUser, localUser } = useUser()
    // Set local user
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        if (userData) setLocalUser(userData);
    }, []);

    useEffect(() => {
        console.log(localUser)
    }, [localUser])

    return (
        <div className="App bg-dark">
            <ConversationsProvider>
            {localUser ? <Profile /> : <Home />}
            </ConversationsProvider>
        </div>
    );
}

export default App;
