// Packages
import { useState } from "react";
import axios from "axios";
// Custom Components
import { useUser } from "../../../contexts/UserProvider";
// React BS Components
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// Icons
import { MdCheckCircle } from 'react-icons/md'

export const PersonalDetailsForm = () => {
    // Local User Context
    const { localUser, setLocalUser } = useUser();

    // State for Form Fields
    const [fields, setFields] = useState({
        firstName: localUser.name.split(" ")[0],
        lastName: localUser.name.split(" ")[1],
        email: localUser.email,
    });

    // de-construct form fields for ease of use
    const { firstName, lastName, email } = fields;

    // validity state of form
    const [validity, setValidity] = useState("untouched");

    // error state of form
    const [error, setError] = useState('');

    // loading state of form
    const [loading, setLoading] = useState(false);

    // Handle input
    const handleInput = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setFields({ ...fields, [key]: value });
    };

    // Handle Submit
    const handleSubmit = async (e) => {

        // prevent page refresh
        e.preventDefault();
        setLoading(true);

        // check for empty fields
        if (!firstName || !lastName || !email) {
            setValidity('Invalid')
            setError("Please fill all fields.");
            setLoading(false);
            return;
        }

        // Try to update user via API
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };
            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-details`,
                fields,
                config
            );
            // Set updated user to local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            // Set the welcome back item in local storage
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: data.email, name: data.name })
            );
            // Set new stored use to the user context
            const userData = JSON.parse(localStorage.getItem("storedUser"));
            setLocalUser(userData);
            // clean-up
            setLoading(false);
            setValidity("Valid");
        } catch (error) {
            setError(error.message);
            setValidity("Invalid");
            setLoading(false);
        }
    };

    return (
        <Row as={Form} className="mb-5" onSubmit={handleSubmit}>
            <h3 className="text-white">Personal Details</h3>
            <Col>
                {/* FIRST NAME FIELD */}
                <Form.Group as={Row} className="p-0 mb-4">
                    <Col>
                        <Form.FloatingLabel
                            as={Row}
                            className="m-0"
                            label="First Name"
                        >
                            <Form.Control
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={handleInput}
                                value={firstName}
                            />
                        </Form.FloatingLabel>
                    </Col>
                </Form.Group>
                {/* LAST NAME FIELD */}
                <Form.Group as={Row} className="p-0 mb-4">
                    <Col>
                        <Form.FloatingLabel
                            as={Row}
                            className="m-0"
                            label="Last Name"
                        >
                            <Form.Control
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={handleInput}
                                value={lastName}
                            />
                        </Form.FloatingLabel>
                    </Col>
                </Form.Group>
                {/* EMAIL FIELD */}
                <Form.Group as={Row} className="p-0 mb-4">
                    <Col>
                        <Form.FloatingLabel
                            label="Email"
                            as={Row}
                            className="m-0"
                        >
                            <Form.Control
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleInput}
                                value={email}
                            />
                        </Form.FloatingLabel>
                    </Col>
                </Form.Group>
                {/* BUTTON */}
                <Row className="m-0 p-0">
                    {validity === "Invalid" && (
                        <span className="m-0 p-0 mb-2 text-danger">
                            {error}
                        </span>
                    )}
                    <Col
                        as={Button}
                        xs="auto"
                        variant="primary"
                        type="submit"
                        className="text-white"
                        disabled={loading}
                    >
                        {loading && (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        <span className="ms-2">Update Details</span>
                    </Col>
                    <Col className="d-flex flex-column justify-content-end">
                        {validity === "Valid" && (
                            <MdCheckCircle size="20px" color="var(--green)" />
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
