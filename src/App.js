import { useState, useEffect } from "react";
import { useUser } from "./contexts/UserProvider";
import "./App.css";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import axios from "axios";

function App() {

    const { setLocalUser, localUser, messageRequests, setMessageRequests } = useUser()
    // Set local user
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        if (userData) setLocalUser(userData);
    }, []);

    useEffect(() => {
        if (localUser) getMessageRequests();
    }, [localUser])

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
                const error_code = JSON.stringify(
                    error.response.data.error
                );
                console.log(error_code);
                return;
            });
        setMessageRequests(data);
    };

    useEffect(() => {
        console.log(messageRequests)
    }, [messageRequests])

    return (
        <div className="App bg-dark">
            <ConversationsProvider>
            {localUser ? <Profile /> : <Home />}
            </ConversationsProvider>
        </div>
    );
}

export default App;
