import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";

export const ContactSlab = ({ contact, size = '60px', fontSize = '14px' }) => {


    return (
        <Slab
            className="p-0 m-0"
        >
            <Col sm={4}>
                {contact && (
                    <Avatar url={contact.avatar} size={size} bgc={"var(--midgrey)"} />
                )}
            </Col>
            <Col className="flex-grow-1">
                <Row style={{ fontSize }}>
                    {contact &&
                        `${contact.firstName} ${contact.lastName}`}
                </Row>
            </Col>
        </Slab>
    );
};

const Notification = styled.div`
    width: 20px;
    height: 20px;
    color: white;
    padding: 0;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: red;
`;

const Slab = styled(Row)`
    cursor: pointer;
    background: ${(props) => props.background};
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
    }
`;
