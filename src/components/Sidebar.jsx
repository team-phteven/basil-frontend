import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";
const ACCOUNT_KEY = "account";

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);

    const handleClick = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    return (
        <div>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="d-flex justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={ACCOUNT_KEY}>Account</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>
            <Button onClick={handleClick}>Log Out</Button>
        </div>
    );
};

export default Sidebar;
