// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// custom components
import PasswordFloatingLabelToggle from "./PasswordFloatingLabelToggle";
import Avatar from "../GlobalComponents/Avatar";
// BS components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function SignUpForm() {
    // navigate instance (for page reload)
    const navigate = useNavigate();
    // form fields state
    const [formFields, setFormFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    });
    // deconstruct form fields
    const { firstName, lastName, email, password, confirmPassword, avatar } =
        formFields;
    // component loading state
    const [loading, setLoading] = useState(false);
    // state for error message
    const [errorMessage, setErrorMessage] = useState("");
    // state for error visibility
    const [showError, setShowError] = useState(false);

    // handle form submit
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        // start loading state
        setLoading(true);
        // check for empty fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setErrorMessage("Please fill all fields.");
            setShowError(true);
            setLoading(false);
            return;
        }
        // check passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match.");
            setShowError(true);
            setLoading(false);
            return;
        }
        // create new user
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/sign-up`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    avatar,
                }
            );
            // store new user in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // store welcome back data in local storage
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: email, name: data.name })
            );
            // set loading state
            setLoading(false);
            // refresh page
            navigate(0);
        } catch (error) {
            const message = error.response.data.error;
            setErrorMessage(message);
            setShowError(true);
            setLoading(false);
        }
    };

    // handle the file upload to Cloudinary
    const handleFile = async (file) => {
        // start loading state
        setLoading(true);
        // check for missing file
        if (file === undefined) {
            setLoading(false);
            return;
        }
        // if file type excepted make upload
        if (["image/jpeg", "image/png", "image/jpeg"].includes(file.type)) {
            // create a new FormData instance (XMLHttpRequest Standard)
            // this format is required for Cloudinary upload API
            const body = new FormData();
            // add file to form data
            body.append("file", file);
            // add cloud preset to form data
            body.append(
                "upload_preset",
                process.env.REACT_APP_CLOUDINARY_PRESET
            );
            // add cloud name to form data
            body.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
            // make post request

            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };

            try {
                const data = await axios
                    .post(
                        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                        body,
                        config
                    )
                // set the uploaded images url to form field
                setFormFields({ ...formFields, avatar: data.data.url });
                // end loading state
                setLoading(false);
            } catch (error) {
                const message = error.response.data.error.message;
                setErrorMessage(message);
                setShowError(true);
                setLoading(false);
            }
        } else {
            setErrorMessage("Incorrect file type. Please upload .jpeg .jpg .png under 10mb");
            setShowError(true);
            setLoading(false);
            return;
        }
    };

    // handle input changes
    const handleInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setFormFields({ ...formFields, [key]: value });
    };

    return (
        <FormContainer>
            <FormCol as={Form} onSubmit={handleSubmit} data-testid="form">
                <FormRow>
                    <FormGroup
                        as={Col}
                        md={6}
                        className="pe-xs-0 pe-md-2"
                        onChange={handleInput}
                        value={formFields.firstName}
                    >
                        <Form.FloatingLabel label="First Name">
                            <Form.Control
                                required
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                    <FormGroup
                        as={Col}
                        md={6}
                        className="ps-xs-0 ps-md-2"
                        onChange={handleInput}
                        value={formFields.lastName}
                    >
                        <Form.FloatingLabel label="Last Name">
                            <Form.Control
                                required
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                </FormRow>
                <FormRow>
                    <FormGroup
                        as={Col}
                        onChange={handleInput}
                        value={formFields.email}
                    >
                        <Form.FloatingLabel label="Email">
                            <Form.Control
                                required
                                id="up-email"
                                type="email"
                                placeholder="Email"
                            />
                        </Form.FloatingLabel>
                    </FormGroup>
                </FormRow>
                <FormRow>
                    <FormGroup as={Col}>
                        <PasswordFloatingLabelToggle
                            data-testid="password"
                            uniqueId="up-password"
                            handleChange={handleInput}
                            value={formFields.password}
                        />
                    </FormGroup>
                </FormRow>
                <FormRow>
                    <FormGroup as={Col}>
                        <PasswordFloatingLabelToggle
                            data-testid="confirm-password"
                            uniqueId="confirmPassword"
                            handleChange={handleInput}
                            value={formFields.confirmPassword}
                        />
                    </FormGroup>
                </FormRow>
                <FormRow>
                    <Col xs="auto">
                        <Avatar
                            url={formFields.avatar || "avatar2.svg"}
                            size="80px"
                            hideStatus
                        />
                    </Col>
                    <Col>
                        <FormGroup
                            as={Col}
                            onChange={(e) => handleFile(e.target.files[0])}
                        >
                            <Form.Label>Avatar (optional)</Form.Label>
                            <Form.Control
                                id="avatar"
                                type="file"
                                accept="image/*"
                            />
                        </FormGroup>
                    </Col>
                </FormRow>
                <FormRow>
                    <Col
                        as={Button}
                        xs={12}
                        md={6}
                        variant="primary"
                        className="mt-4"
                        type="submit"
                        disabled={loading}
                    >
                        Submit
                    </Col>
                    {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
                </FormRow>
            </FormCol>
        </FormContainer>
    );
}

export default SignUpForm;

const ErrorMessage = styled.span`
    color: red;
    margin: 20px 0;
    padding: 0;
`;

const FormContainer = styled(Row)`
    padding: 0;
    margin: 20px 0px;
`;

const FormRow = styled(Row)`
    padding: 0;
    margin: 0px 0px 0px 0px;
`;

const FormCol = styled(Col)`
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
