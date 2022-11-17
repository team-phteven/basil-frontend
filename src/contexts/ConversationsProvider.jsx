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

    useEffect(() => {
        getMessages();
    }, [selectedConversation]) 
    // Selecting conversation
    // TO-DO: CONVERSATION WITH MOST RECENT MESSAGE SHOULD BE SELECTED
    // useEffect(() => {
    //     setSelectedConversation(conversations[0]);
    // }, [conversations]);


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
        setSelectedConversationUsers(selectedConversation.users);
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
        selectedConversationUsers,
        setSelectedConversationUsers,
        getConversations,
        getMessages,
    };

    return (
        <ConversationsContext.Provider value={values}>
            {children}
        </ConversationsContext.Provider>
    );
}
