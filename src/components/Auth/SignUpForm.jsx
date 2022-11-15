// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

    // handle form submit
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setLoading(true);
        // check for empty fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            console.log("missing field!");
            setLoading(false);
            return;
        }
        // check passwords match
        if (password !== confirmPassword) {
            console.log("passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            // create new user
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/sign-up`,
                { firstName, lastName, email, password, avatar }
            );
            // store new user in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: email, name: data.name })
            );
            setLoading(false);
            // refresh page
            navigate(0);
        } catch (error) {
            console.log("error: " + error.message);
            setLoading(false);
        }
    };

    const handleFile = (file) => {
        setLoading(true);
        if (file === undefined) {
            console.log("file upload failed");
        }
        if (["image/jpeg", "image/png", "image/jpeg"].includes(file.type)) {
            const data = new FormData();
            data.append("file", file);
          data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
          data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
            fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                {
                    method: "post",
                    body: data,
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    setFormFields({
                        ...formFields,
                        avatar: data.url.toString(),
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            console.log("Wrong file format");
        }
    };

    const handleInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setFormFields({ ...formFields, [key]: value });
    };

    return (
        <Row className="p-3">
            <Col as={Form} onSubmit={handleSubmit}>
                <Row className="mt-4">
                    <Form.Group
                        as={Col}
                        md={6}
                        className="p-0 pe-xs-0 pe-md-2 mb-4"
                        onChange={handleInput}
                        value={formFields.firstName}
                    >
                        <Form.FloatingLabel label="First Name">
                            <Form.Control
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                            />
                        </Form.FloatingLabel>
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        md={6}
                        className="p-0 ps-xs-0 ps-md-2 mb-4"
                        onChange={handleInput}
                        value={formFields.lastName}
                    >
                        <Form.FloatingLabel label="Last Name">
                            <Form.Control
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                            />
                        </Form.FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group
                        as={Col}
                        className="p-0 mb-4"
                        onChange={handleInput}
                        value={formFields.email}
                    >
                        <Form.FloatingLabel label="Email">
                            <Form.Control
                                id="up-email"
                                type="email"
                                placeholder="Email"
                            />
                        </Form.FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="p-0 mb-4">
                        <PasswordFloatingLabelToggle
                            uniqueId="up-password"
                            handleChange={handleInput}
                            value={formFields.password}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="p-0 mb-4">
                        <PasswordFloatingLabelToggle
                            uniqueId="confirmPassword"
                            handleChange={handleInput}
                            value={formFields.confirmPassword}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Avatar
                            url={formFields.avatar || "avatar2.svg"}
                            size="80px"
                            hideStatus
                        />
                    </Col>
                    <Col>
                        <Form.Group
                            as={Col}
                            className="p-0 mb-5"
                            onChange={(e) => handleFile(e.target.files[0])}
                        >
                            <Form.Label>Avatar (optional)</Form.Label>
                            <Form.Control
                                id="avatar"
                                type="file"
                                accept="image/*"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="w-0">
                    <Col md={6} className="p-0">
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 text-white"
                            disabled={loading ? true : false}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default SignUpForm;
