// Custom components
import LogInForm from "./Auth/LogInForm";
import SignUpForm from "./SignUpForm";
// BS components
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const FormTabs = () => {
    return (
        <Col md={6} className="my-5 mx-auto p-0">
            <Tabs defaultActiveKey="signIn" className="border-0 rounded-0" fill>
                <Tab
                    eventKey="signIn"
                    title="Sign In"
                    className="border border-top-0 p-0 m-0 mt-4 border-0"
                >
                    <LogInForm />
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
    );
};

export default FormTabs;
