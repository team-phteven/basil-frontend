import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("storedUser"));
        setUser(userData);
    }, []);

    return (
        <div className="App bg-dark">
          {user ? <Profile /> : <Home />}
        </div>
    );
}

export default App;
