import { useState, useEffect } from "react";
import "./App.css";
import { ContactsProvider } from "./contexts/ContactsProvider";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        setUser(userData);
    }, []);

    const profile = (
        <ContactsProvider storedUser={user}>
            <Profile />
        </ContactsProvider>
    );

    return <div className="App bg-dark">{user ? profile : <Home />}</div>;
}

export default App;
