import styled from "styled-components";
import Avatar from "./Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";

const Request = ({ request }) => {
    return (
        <StyledRow>
            <Col
                xs="auto"
                className="d-flex flex-column justify-content-center"
            >
                <Avatar url={request.avatar} size="3rem" bgc="black" />
            </Col>
            <Col
                xs="auto"
                className="d-flex flex-column justify-content-center"
            >
                <span>
                    {request.firstName} {request.lastName}
                </span>
            </Col>
            <Col
                xs="auto"
                className="mx-3 ms-auto d-flex flex-column justify-content-center"
            >
                <Row>
                    <RejectButton className="m-1"></RejectButton>
                    <AcceptButton className="m-1"></AcceptButton>
                </Row>
            </Col>
        </StyledRow>
    );
};

const AcceptButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(0,255,0);
`
const RejectButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgb(255, 0, 0);
`;

const StyledRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-items: center;
`;

export default Request;
