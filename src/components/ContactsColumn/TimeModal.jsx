// Packages
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Duration } from "luxon";
// Contexts
import { useUser } from "../../contexts/UserProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
// Custom Components
import Avatar from "../GlobalComponents/Avatar";
import TimeGraph from "./TimeGraph";
import formatConvoInfo from "../../utils/formatConvoInfo";
//  BS Components
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

const TimeModal = () => {
    // destructure conversation provider
    const { selectedConversation, selectedConversationMessages } =
        useConversations();

    // state for billable seconds
    const [billableSeconds, setBillableSeconds] = useState();

    // sum of all current billable seconds
    const timeSum = billableSeconds?.reduce((prev, curr) => {
        const seconds = curr.seconds;
        return prev + seconds;
    }, 0);

    // sum of all current messages
    const messagesSum = billableSeconds?.reduce((prev, curr) => {
        const messages = curr.messages;
        return prev + messages;
    }, 0);

    // set billable seconds when conversation changes or messages are loaded
    useEffect(() => {
        selectedConversation &&
            setBillableSeconds(
                formatConvoInfo(
                    selectedConversation.users,
                    selectedConversation.billableSeconds,
                    selectedConversationMessages
                )
            );
    }, [selectedConversation, selectedConversationMessages]);

    return (
        <>
            <ModalHeader closeButton>
                <h2>Billable Time</h2>
            </ModalHeader>
            <ModalBody>
                <Col>
                    {billableSeconds?.map((user, index) => {
                        // convert seconds > milliseconds > m:ss format
                        const millis = Duration.fromMillis(
                            user.seconds * 1000
                        ).toFormat("m:ss", { floor: true });

                        return (
                            <StatRow key={index}>
                                <StatCol>
                                    <Title>
                                        {user.firstName} {user.lastName}
                                    </Title>
                                    <Avatar
                                        hideStatus
                                        url={user.avatar}
                                        size="80px"
                                    />
                                </StatCol>
                                <StatCol>
                                    <Title>Minutes</Title>
                                    <TimeGraph
                                        seconds={millis}
                                        percentage={`${
                                            (user.seconds / timeSum) * 100
                                        }%`}
                                    />
                                </StatCol>
                                <StatCol>
                                    <Title>Messages</Title>
                                    <TimeGraph
                                        seconds={user.messages}
                                        percentage={`${
                                            (user.messages / messagesSum) * 100
                                        }%`}
                                    />
                                </StatCol>
                            </StatRow>
                        );
                    })}
                </Col>
            </ModalBody>
        </>
    );
}

export default TimeModal;

const StatRow = styled(Row)`
    margin: 40px 0;
`

const StatCol = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: between;
`

const ModalBody = styled(Modal.Body)`
    background-color: var(--lightgrey);
`

const ModalHeader = styled(Modal.Header)`
    background-color: var(--lightgrey);
`

const Title = styled.h3`
    color: var(--darkgrey);
    font-size: 14px;
`
