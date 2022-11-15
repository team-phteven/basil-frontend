import React from "react";
import { useEffect, useState, useRef } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import axios from "axios";

const ConvoInfo = () => {
    const { selectedConversation, activeSeconds, setActiveSeconds } =
        useConversations();
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
        console.log(activeSeconds);
    }, [selectedConversation]);

    useEffect(() => {
        return () => clearInterval(id.current);
    }, []);

    let id = useRef();

    function handleTime() {
        id.current = setInterval(() => {
            setActiveSeconds((prev) => prev + 1);
            console.log(activeSeconds);
        }, 1000);
    }

    return (
        <>
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
            <div>active seconds: {activeSeconds}</div>
            <button onClick={() => handleTime()}>Start</button>
            <button onClick={() => clearInterval(id.current)}>Pause</button>
            <button
                onClick={() => {
                    clearInterval(id.current);
                    setActiveSeconds(0);
                    console.log(activeSeconds);
                }}
            >
                Reset
            </button>
        </>
    );
};

export default ConvoInfo;
