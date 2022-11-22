// Packages
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Contexts
import { useUser } from "../../../contexts/UserProvider";
// Custom Components
import PasswordFloatingLabelToggle from '../../Auth/PasswordFloatingLabelToggle';
// React BS Components
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// Icons
import { MdCheckCircle } from 'react-icons/md';


export const PasswordForm = () => {
    // Local User Context
    const { localUser, setLocalUser } = useUser();

    // State for Form Fields
    const [fields, setFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // de-construct form fields for ease of use
    const { oldPassword, newPassword, confirmPassword } = fields;

    // validity state of form
    const [validity, setValidity] = useState("untouched");

    // Error state of form
    const [error, setError] = useState("");

    // loading state of form
    const [loading, setLoading] = useState(false);

    // Handle input
    const handleInput = (e) => {
        const keyString = e.target.id;
        // remove the 'up' and 'in' prefix from email and password id's
        const key = keyString.substring(keyString.indexOf("-") + 1);
        const value = e.target.value;
        setFields({ ...fields, [key]: value });
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setLoading(true);

        // check for empty fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            setValidity("Invalid");
            setError('Missing field.');
            setLoading(false);
            return;
        }

        // Check passwords match
        if (newPassword !== confirmPassword) {
            setValidity("Invalid");
            setError("Confirmation password doesn't match.");
            setLoading(false);
            return;
        }

        // try to update users passwords
        try {

            const passwords = {
                oldPassword,
                newPassword,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${localUser.token}`,
                },
            };

            // update user
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/users/update-password`,
                passwords,
                config
            );
            
            // Clear fields
            setFields({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            // Clean up
            setValidity("Valid");
            setLoading(false);
            setError("");
        } catch (error) {
            setValidity('Invalid');
            setError(error.message);
            setLoading(false);
            return;
        }
    };

    return (
        <StyledRow as={Form} onSubmit={handleSubmit}>
            <Heading>Change Password</Heading>
            <Col>
                <FormGroup as={Row}>
                    <PasswordFloatingLabelToggle
                        label="Current Password"
                        uniqueId="oldPassword"
                        handleChange={handleInput}
                        value={oldPassword}
                    />
                </FormGroup>
                <FormGroup as={Row}>
                    <PasswordFloatingLabelToggle
                        label="New Password"
                        uniqueId="newPassword"
                        handleChange={handleInput}
                        value={newPassword}
                    />
                </FormGroup>
                <FormGroup as={Row}>
                    <PasswordFloatingLabelToggle
                        label="Confirm New Password"
                        uniqueId="confirmPassword"
                        handleChange={handleInput}
                        value={confirmPassword}
                    />
                </FormGroup>
                <StyledRow>
                    {validity === "Invalid" && <ErrorText>{error}</ErrorText>}
                    <Col
                        as={Button}
                        xs="auto"
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading && (
                            <>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{" "}
                            </>
                        )}
                        <span>Update Password</span>
                    </Col>
                    <Check>
                        {validity === "Valid" && (
                            <MdCheckCircle size="20px" color="var(--green)" />
                        )}
                    </Check>
                </StyledRow>
            </Col>
        </StyledRow>
    );
}

const Heading = styled.h3`
    color: white;
`

const Check = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: end;
`

const ErrorText = styled.span`
    margin: 0 0 20px 0;
    padding: 0;
    color: red
`

const FormGroup = styled(Form.Group)`
 padding: 0;
 margin-bottom: 20px;
`

const StyledRow = styled(Row)`
    padding: 0;
    margin: 0 0 40px 0;
`;