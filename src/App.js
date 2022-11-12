import { useUser } from "./contexts/UserProvider";
import "./App.css";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
    const { localUser } = useUser();

    return (
        <div className="App bg-dark">
            <ConversationsProvider>
                <SocketProvider>
                    {localUser ? <Profile /> : <Home />}
                </SocketProvider>
            </ConversationsProvider>
        </div>
    );
}

export default App;
