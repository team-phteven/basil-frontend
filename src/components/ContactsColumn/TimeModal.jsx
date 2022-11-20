import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
import { Modal, Form, Button, Col } from "react-bootstrap";
import formatConvoInfo from "../../utils/formatConvoInfo";
import Row from "react-bootstrap/Row";
import Avatar from "../GlobalComponents/Avatar";
import TimeGraph from "./TimeGraph";
import styled from "styled-components";
import { Duration } from "luxon";

export default function TimeModal({ closeModal }) {
    const { selectedConversation, selectedConversationMessages } =
        useConversations();
    const [billableSeconds, setBillableSeconds] = useState();

    const timeSum = billableSeconds?.reduce((prev, curr) => {
        const seconds = curr.seconds;
        return prev + seconds;
    }, 0);

    const messagesSum = billableSeconds?.reduce((prev, curr) => {
        const messages = curr.messages;
        return prev + messages;
    }, 0);

    useEffect(() => {
        if (selectedConversation) {
            setBillableSeconds(
                formatConvoInfo(
                    selectedConversation.users,
                    selectedConversation.billableSeconds,
                    selectedConversationMessages
                )
            );
        }
    }, [selectedConversation, selectedConversationMessages]);

    return (
        <>
            <ModalHeader closeButton>
                <h2>Billable Time</h2>
            </ModalHeader>
            <ModalBody>
                <Col>
                    {billableSeconds?.map((user, index) => {
                        const millis = Duration.fromMillis(user.seconds * 1000)
                            .toFormat("m:ss", {floor: true})

                        return <Row key={index} className="p-2 mb-4">
                            <Col className="d-flex flex-column align-items-center justify-content-between">
                                <Title>
                                    {user.firstName} {user.lastName}
                                </Title>
                                <Avatar
                                    hideStatus
                                    url={user.avatar}
                                    size="80px"
                                />
                            </Col>
                            <Col className="d-flex flex-column align-items-center justify-content-between">
                                <Title>Minutes</Title>
                                <TimeGraph
                                    seconds={millis}
                                    percentage={`${
                                        (user.seconds / timeSum) * 100
                                    }%`}
                                />
                            </Col>
                            <Col className="d-flex flex-column align-items-center justify-content-between">
                                <Title>Messages</Title>
                                <TimeGraph
                                    seconds={user.messages}
                                    percentage={`${
                                        (user.messages / messagesSum) * 100
                                    }%`}
                                />
                            </Col>
                        </Row>
                    })}
                </Col>
            </ModalBody>
        </>
    );
}

const ModalBody = styled(Modal.Body)`
    background-color: var(--lightgrey);
`;

const ModalHeader = styled(Modal.Header)`
    background-color: var(--lightgrey);
`;

const Title = styled.h3`
    color: var(--darkgrey);
    font-size: 14px;
`;
