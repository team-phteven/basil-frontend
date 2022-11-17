import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedConversationMessages, setSelectedConversationMessages] = useState([]);
    const [otherConversations, setOtherConversations] = useState(null);
    const [messageNotifications, setMessageNotifications] = useState({});
    const [selectedConversationUsers, setSelectedConversationUsers] = useState(null);


    const { localUser } = useUser();

    // Get conversations when localUSer updates
    useEffect(() => {
        if (localUser) getConversations();
    }, [localUser]);

    // Fetching conversations from database
    const getConversations = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };

        const { data } = await axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/conversations`, config)
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setConversations(data);
    };

    // Selecting conversation
    // TO-DO: CONVERSATION WITH MOST RECENT MESSAGE SHOULD BE SELECTED
    useEffect(() => {
        setSelectedConversation(conversations[0]);
    }, [conversations]);

    // Setting all other conversations to otherConversations
    useEffect(() => {
        setOtherConversations(
            conversations.filter((conversation) => {
                return conversation._id !== selectedConversation._id;
            })
        );
        // get messages for selected conversation
        if (selectedConversation) getMessages();
        // get set users from slected conversation;
        if (selectedConversation) setSelectedConversationUsers(selectedConversation.users)
    }, [selectedConversation]);

    // getting messages for the selected conversation
    const getMessages = async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localUser.token}`,
            },
        };
        const { data } = await axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/api/messages/${selectedConversation._id}`,
                config
            )
            .catch((error) => {
                const error_code = JSON.stringify(error.response.data.error);
                console.log(error_code);
                return;
            });
        setSelectedConversationMessages(data);
    };

    const values = {
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        selectedConversationMessages,
        setSelectedConversationMessages,
        otherConversations,
        setOtherConversations,
        messageNotifications,
        setMessageNotifications,
        selectedConversationUsers
    };

    return (
        <ConversationsContext.Provider value={values}>
            {children}
        </ConversationsContext.Provider>
    );
}
