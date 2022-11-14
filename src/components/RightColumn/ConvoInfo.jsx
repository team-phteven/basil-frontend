import React from "react";
import { useEffect, useState } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import axios from "axios";

const ConvoInfo = () => {
    const { selectedConversation } = useConversations();
    const { localUser } = useUser();
    const [timeInfo, setTimeInfo] = useState([]);

    const formatConvoInfo = (users, billableSeconds) => {
        let formattedArray = [];
        console.log(users);
        for (let id in billableSeconds) {
            users.forEach((user) => {
                if (user._id == id) {
                    formattedArray.push({
                        email: user.email,
                        seconds: billableSeconds[id],
                    });
                }
            });
        }
        console.log(formattedArray);
        setTimeInfo(formattedArray);
    };

    useEffect(() => {
        selectedConversation &&
            formatConvoInfo(
                selectedConversation.users,
                selectedConversation.billableSeconds
            );
    }, [selectedConversation]);

    return (
        <div>
            {timeInfo &&
                timeInfo.map((user, index) => {
                    return (
                        <p key={index}>
                            {user.seconds}
                            {user.email}
                        </p>
                    );
                })}
        </div>
    );
};

export default ConvoInfo;
