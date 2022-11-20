import React from "react";
import { useEffect, useState, useRef } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import { useUser } from "../../contexts/UserProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import formatConvoInfo from "../../utils/formatConvoInfo";
import styled from "styled-components";

const ConvoInfo = () => {
    const { selectedConversation, activeSeconds, setActiveSeconds } =
        useConversations();
    const { localUser } = useUser();
    const [timeInfo, setTimeInfo] = useState([]);

    // sets timeInfo using util function using info from selecetedConversation
    useEffect(() => {
        selectedConversation &&
            setTimeInfo(
                formatConvoInfo(
                    selectedConversation.users,
                    selectedConversation.billableSeconds
                )
            );
        console.log(activeSeconds);
    }, [selectedConversation]);

    return (
        <Row>
            {timeInfo &&
                // maps through timeInfo array displaying properties of users
                timeInfo.map((user, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <img
                                    src={user.avatar}
                                    style={{ height: "70px" }}
                                ></img>
                            </div>

                            <div>
                                {user.firstName} {user.lastName}:{user.seconds}{" "}
                                active seconds
                            </div>
                        </div>
                    );
                })}
        </Row>
    );
};

export default ConvoInfo;
