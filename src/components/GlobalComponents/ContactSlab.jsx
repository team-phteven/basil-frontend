// Packages
import styled from "styled-components";
// Custom Components
import Avatar from "./Avatar";
// BS Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ContactSlab = ({ contact, size = "60px", fontSize = "16px" }) => {
    return (
        <Slab>
            <Col xs="auto">
                {contact && (
                    <Avatar
                        url={contact.avatar}
                        size={size}
                        bgc={"var(--midgrey)"}
                    />
                )}
            </Col>
            <NameCol>
                <NameRow as="span" fontSize={fontSize}>
                    {contact && `${contact.firstName} ${contact.lastName}`}
                </NameRow>
            </NameCol>
        </Slab>
    );
};

const NameCol = styled(Col)`
    padding: 10px;
    margin: 0;
`;

const NameRow = styled(Row)`
    font-size: ${(props) => props.fontSize};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
    margin: 0;
`;

const Slab = styled(Row)`
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

export default ContactSlab;
