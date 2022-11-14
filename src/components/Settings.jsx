// packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// custom components
import PasswordFloatingLabelToggle from "./Auth/PasswordFloatingLabelToggle";
import { useUser } from "../contexts/UserProvider";
// BS components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styledComponents from "styled-components";

function Settings() {
    const { localUser, setLocalUser } = useUser();

    // navigate instance (for page reload)
    const navigate = useNavigate();
    // form fields state
    const [personalFields, setPersonalFields] = useState({
        firstName: localUser.name.split(" ")[0],
        lastName: localUser.name.split(" ")[1],
        email: localUser.email,
    });

    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [personalLoading, setPersonalLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);


    // component loading state
    const [loading, setLoading] = useState(false);

    const handleFile = (file) => {
        setLoading(true);
        if (file === undefined) {
            console.log("file upload failed");
        }
        if (["image/jpeg", "image/png", "image/jpeg"].includes(file.type)) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "chatApp");
            data.append("cloud_name", `${process.env.CLOUDINARY_NAME}`);
            fetch(
                
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
                {
                    method: "post",
                    body: data,
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
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

    const handlePersonalInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setPersonalFields({ ...personalFields, [key]: value });
    };

    const handlePasswordInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setPasswordFields({ ...passwordFields, [key]: value });
    };

    const updateDetails = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setPersonalLoading(true);
        // check for empty fields
        if (
            !personalFields.firstName ||
            !personalFields.lastName ||
            !personalFields.email
        ) {
            console.log("missing field!");
            setPersonalLoading(false);
            return;
        }
        try {

            const details = {
                firstName: personalFields.firstName,
                lastName: personalFields.lastName,
                email: personalFields.email,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };

            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-details`,
                details,
                config,
            );

            localStorage.setItem("storedUser", JSON.stringify(data));
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: data.email, name: data.name })
            );
            setPersonalLoading(false);
            const userData = JSON.parse(localStorage.getItem("storedUser"));
            setLocalUser(userData);
        } catch (error) {
            console.log("error: " + error.message);
            setPersonalLoading(false);
        }
    }

    const updatePassword = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setPasswordLoading(true);
        // check for empty fields
        if (
            !passwordFields.oldPassword ||
            !passwordFields.newPassword ||
            !passwordFields.confirmPassword
        ) {
            console.log("missing field!");
            setPasswordLoading(false);
            return;
        }

        if ( passwordFields.newPassword !== passwordFields.confirmPassword ) {
            console.log("Confirmation password must match new password");
            setPasswordLoading(false);
            return;
        }

        try {

            const details = {
                oldPassword: passwordFields.oldPassword,
                newPassword: passwordFields.newPassword,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };

            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-password`,
                details,
                config,
            );

            setPasswordFields({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.log("error: " + error.message);
            setPasswordLoading(false);
            return
        }
    }

    return (
        <Menu className="p-2 m-0">
            <h2 className="text-white mb-4">Profile Settings</h2>

            {/* UPDATE DETAILS */}
            <Row as={Form} className="mb-5" onSubmit={updateDetails}>
                <h3 className="text-white">Personal Details</h3>
                <Col>
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
                                    onChange={handlePersonalInput}
                                    value={personalFields.firstName}
                                />
                            </Form.FloatingLabel>
                        </Col>
                    </Form.Group>
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
                                    onChange={handlePersonalInput}
                                    value={personalFields.lastName}
                                />
                            </Form.FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="p-0 mb-4">
                        <Col>
                            <Form.FloatingLabel
                                label="Email"
                                as={Row}
                                className="m-0"
                            >
                                <Form.Control
                                    id="up-email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handlePersonalInput}
                                    value={personalFields.email}
                                />
                            </Form.FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Row className="m-0 p-0">
                        <Button
                            as={Col}
                            xs="auto"
                            variant="primary"
                            type="submit"
                            onClick={updateDetails}
                            className="text-white"
                            disabled={personalLoading ? true : false}
                        >
                            Update Details
                        </Button>
                    </Row>
                </Col>
            </Row>

            {/* CHANGE PASSWORD */}
            <Row as={Form} className="p-0 mb-5">
                <h3 className="text-white">Change Password</h3>
                <Col>
                    <Form.Group
                        as={Row}
                        className="p-0 mb-4"
                        onChange={handlePasswordInput}
                        value={passwordFields.oldPassword}
                    >
                        <PasswordFloatingLabelToggle
                            label="Current Password"
                            uniqueId="oldPassword"
                        />
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="p-0 mb-4"
                        onChange={handlePasswordInput}
                        value={passwordFields.newPassword}
                    >
                        <PasswordFloatingLabelToggle
                            label="New Password"
                            uniqueId="newPassword"
                        />
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="p-0 mb-4"
                        onChange={handlePasswordInput}
                        value={passwordFields.confirmPassword}
                    >
                        <PasswordFloatingLabelToggle
                            label="Confirm New Password"
                            uniqueId="confirmPassword"
                        />
                    </Form.Group>
                    <Row className="p-0 m-0">
                        <Button
                            as={Col}
                            xs="auto"
                            variant="primary"
                            type="submit"
                            className="text-white"
                            disabled={passwordLoading ? true : false}
                            onClick={updatePassword}
                        >
                            Update Password
                        </Button>
                    </Row>
                </Col>
            </Row>
            {/* Change Avatar */}
            <h3 className="text-white">Change Avatar</h3>
            <Row as={Form} className="p-0 mb-5">
                <Col>
                    <Form.Group
                        as={Col}
                        className="p-0 mb-4"
                        onChange={(e) => handleFile(e.target.files[0])}
                    >
                        <Form.Control
                            id="password"
                            type="file"
                            accept="image/*"
                        />
                    </Form.Group>
                    <Row className="p-0 m-0">
                        <Button
                            as={Col}
                            xs="auto"
                            variant="primary"
                            type="submit"
                            className="text-white"
                            disabled={loading ? true : false}
                        >
                            Update Avatar
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Menu>
    );
}

const Menu = styledComponents(Col)`
    background: var(--darkgrey)
`;

export default Settings;
