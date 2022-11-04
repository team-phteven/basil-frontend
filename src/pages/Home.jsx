// packages
import {useState} from 'react'
// custom components
import FormTabs from "../components/FormTabs";
// BS components
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const Home = () => {

    return (
        <Container as="main" className="mx-auto px-4">
            <Row>
                <Col xs={5} md={2} className="mt-5 mx-auto">
                    <Image rounded fluid src="BasilLogo2.png"></Image>
                </Col>
            </Row>
            <Row>
                <FormTabs />
            </Row>
        </Container>
    );
};

export default Home;
