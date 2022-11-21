// packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// custom components
import PasswordFloatingLabelToggle from "./PasswordFloatingLabelToggle";
// BS components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function LogInForm() {
    // navigate instance (for page reload)
    const navigate = useNavigate();

    // welcome back state
    const [welcomeBack, setWelcomeBack] = useState({
        email: "",
        name: "",
    });

    // formFields state
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });

    // state for component loading
    const [loading, setLoading] = useState(false);

    // load welcome back data
    useEffect(() => {
        // get from local storage and parse
        const welcome = JSON.parse(localStorage.getItem("welcomeBack"));
        // set welcome data in state
        setWelcomeBack(welcome);
        // fill email field with stored email
        if (welcome) {
            setFormFields({
                email: welcome.email,
                password: "",
            });
        }
    }, []);

    // deconstruct formFields
    const { email, password } = formFields;

    // handle the form submit
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        // start loading state
        setLoading(true);
        // try catch block for axios request
        try {
            // create new user session
            const { data } = await axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/users/log-in`, {
                    email,
                    password,
                })
                .catch((error) => {
                    const error_code = JSON.stringify(
                        error.response.data.error
                    );
                    console.log(error_code);
                    setLoading(false);
                    return;
                });
            // store new user session in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // store new welcome back data in local storage
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: email, name: data.name })
            );
            // end loading state
            setLoading(false);
            // refresh page
            navigate(0);
        } catch (error) {
            setLoading(false);
        }
    };

    // controlled inputs for form
    const handleInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        // (see below for why these prefixes are needed)
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setFormFields({ ...formFields, [key]: value });
    };

    return (
        <FormContainer>
            {welcomeBack && (
                <WelcomeMessage>
                    Welcome back, {welcomeBack.name.split(" ")[0]}
                </WelcomeMessage>
            )}
            <Col as={Form} onSubmit={handleSubmit}>
                <Row>
                    <FormGroup as={Col}>
                        <Form.FloatingLabel label="Email">
                            <Form.Control
                                className="border-0"
                                id="email"
                                type="email"
                                value={formFields.email}
                                onChange={handleInput}
                                placeholder="Email"
                                required
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup as={Col}>
                        <PasswordFloatingLabelToggle
                            // because sign-up and sign-in are both loaded in tabs
                            // we need to add unique id's for fields
                            uniqueId={"in-password"}
                            handleChange={handleInput}
                            value={formFields.password}
                        />
                    </FormGroup>
                </Row>
                <Row>
                    <Col
                        as={Button}
                        xs={12}
                        md={6}
                        variant="primary"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        Submit
                    </Col>
                </Row>
            </Col>
        </FormContainer>
    );
}

export default LogInForm;

const FormContainer = styled(Row)`
    padding: 0;
    margin: 0;
`;

const FormGroup = styled(Form.Group)`
    padding: 0;
    margin: 0px 0px 20px 0px;
`;

const WelcomeMessage = styled.span`
    font-size: var(--fs-display);
    color: var(--lightgrey);
    text-align: center;
    margin: 0 0 20px 0;
    padding: 0;
`;
