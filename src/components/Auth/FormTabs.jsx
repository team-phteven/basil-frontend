// Packages
import styled from "styled-components"
// Custom components
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
// BS components
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const FormTabs = () => {
    return (
        <TabContainer md={6}>
            <TabControl defaultActiveKey="signIn" fill>
                <Tab
                    eventKey="signIn"
                    title="Sign In"
                >
                    <LogInForm />
                </Tab>
                <Tab
                    eventKey="signUp"
                    title="Sign Up"
                >
                    <SignUpForm />
                </Tab>
            </TabControl>
        </TabContainer>
    );
};

export default FormTabs;

const TabContainer = styled(Col)`
    margin: 20px auto;
    padding: 0;
`
const TabControl = styled(Tabs)`
    border: none;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
`