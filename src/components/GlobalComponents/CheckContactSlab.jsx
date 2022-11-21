// Packages
import styled from "styled-components";
import { useEffect } from "react";
// Custom Components
import Avatar from "./Avatar";
// BS Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const CheckContactSlab = ({
    contact,
    disabled,
    size = "60px",
    handleCheckboxChange,
    selectedUserIds,
}) => {

    return (
        // dim opacity if user is disabled (already in chat)
        <Slab disabled={disabled}>
            <AvatarCol>
                {contact && (
                    <Avatar
                        url={contact.avatar}
                        size={size}
                        bgc={"var(--midgrey)"}
                    />
                )}
            </AvatarCol>
            <NameCol>
                <span as={Row}>
                    {contact?.firstName} {contact?.lastName}
                </span>
            </NameCol>
            <CheckCol>
                    <Form.Check
                        disabled={disabled}
                        value={selectedUserIds.includes(contact?._id)}
                        onChange={() => {
                            handleCheckboxChange(contact?._id);
                        }}
                    />
            </CheckCol>
        </Slab>
    );
};

export default CheckContactSlab

const AvatarCol = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: start;
`

const NameCol = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CheckCol = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const Slab = styled(Row)`
    opacity: ${(props) => props.disabled ? "0.5" : "1"};
    cursor: pointer;
    background: ${(props) => props.background};
    display: flex;
    margin: 0px;
    padding: 10px 0px;
    flex-direction: row;
    align-items: center;
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;
