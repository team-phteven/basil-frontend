import React, { useState } from "react";
import { Nav, Tab, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Conversations from "../components/Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";
const ACCOUNT_KEY = "account";

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationsOpen = activeKey === CONVERSATIONS_KEY;

    const onLogout = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{ width: "250px" }} className="d-flex flex-column">
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
                </Nav>
                <Tab.Content className="border-end overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    <Button onClick={onLogout}>Log Out</Button>
                    <Button onClick={() => setModalOpen(true)} className="ms-1">
                        New {conversationsOpen ? "Convo" : "Contact"}
                    </Button>
                </div>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen ? (
                    <NewConversationModal closeModal={closeModal} />
                ) : (
                    <NewContactModal closeModal={closeModal} />
                )}
            </Modal>
        </div>
    );
};

export default Sidebar;
