import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";

export const CheckContactSlab = ({
    contact,
    size = "60px",
    fontSize = "16px",
    handleCheckboxChange,
    selectedUserIds,
}) => {
    return (
        <Slab>
            <Col sm={4}>
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
                            padding: "0px",
                        }}
                    >
                        {contact && `${contact.firstName} ${contact.lastName}`}
                    </span>
                </Row>
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
                    <Form.Check
                        value={selectedUserIds.includes(contact._id)}
                        onChange={() => {
                            handleCheckboxChange(contact._id);
                        }}
                    />
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
        background: rgba(0, 0, 0, 0.1);
    }
`;
