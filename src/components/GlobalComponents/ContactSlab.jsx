import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";

const ContactSlab = ({ contact, size = '60px', fontSize = '16px' }) => {


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
            <Col className="flex-grow-1 ms-2 flex-nowrap">
                <Row
                    className=""
                    style={{
                        fontSize,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: "120px",
                    }}
                >
                    <span
                        style={{
                            fontSize,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            margin: "0px",
                            padding: "0px"
                        }}
                    >
                        {contact && `${contact.firstName} ${contact.lastName}`}
                    </span>
                </Row>
            </Col>
        </Slab>
    );
};

const Slab = styled(Row)`
    cursor: pointer;
    background: ${(props) => props.background};
    display: flex;
    margin: 0px;
    padding: 10px 0px;
    flex-direction: row;
    align-items: center;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
`;

export default ContactSlab;
