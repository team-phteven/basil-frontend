// packages
import { useEffect } from "react";
// custom components
import SignInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
// BS components
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const Home = () => {

    return (
        <Container as="main" className="mt-5 mx-auto px-4">
            <Row>
                <Col xs={5} md={2} className="mt-5 mx-auto">
                    <Image rounded fluid src="BasilLogo.png"></Image>
                </Col>
            </Row>
            <Row>
                <Col
                    md={6}
                    className="my-5 mx-auto p-0"
                    style={{ overflow: "hidden" }}
                >
                    <Tabs defaultActiveKey="signIn" className="border-0 rounded-0" fill>
                        <Tab
                            eventKey="signIn"
                            title="Sign In"
                            className="border border-top-0 p-0 m-0 mt-4 border-0"
                            tabClassName="/signIn"
                        >
                            <SignInForm />
                        </Tab>
                        <Tab
                            eventKey="signUp"
                            title="Sign Up"
                            className="border border-top-0 p-0 border-0"
                        >
                            <SignUpForm />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
