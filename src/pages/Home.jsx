// packages
// custom components
import FormTabs from "../components/Auth/FormTabs";
// BS components
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const Home = () => {

    return (
        <Container as="main" className="mx-auto px-4">
            <Row>
                <Col xs={4} sm={3} md={3} lg={2} className="mt-5 mx-auto">
                    <Image rounded fluid src="BasilLogo2.svg"></Image>
                </Col>
            </Row>
            <Row>
                <FormTabs />
            </Row>
        </Container>
    );
};

export default Home;
