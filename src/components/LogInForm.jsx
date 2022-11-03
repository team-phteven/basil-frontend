// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    // state for form fields
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });
    // deconstruct formFields
    const {email, password} = formFields;
    // state for component loading
    const [loading, setLoading] = useState(false);


    // handle the form submit
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();
        setLoading(true);
        // handle missing inputs
        if (!email || !password) {
            console.log("missing field");
            setLoading(false);
            return;
        }
        try {
            // create new user session
            const { data } = await axios.post(
                "http://localhost:5000/api/users/log-in",
                { email, password }
            );
            // store new user session in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            setLoading(false);
            // refresh page
            navigate(0);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    
    // create controlled inputs for form
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
                <Row>
                    <Form.Group
                        as={Col}
                        className="p-0 mb-4"
                        onChange={handleInput}
                        value={formFields.email}
                    >
                        <Form.FloatingLabel label="Email">
                            <Form.Control
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </Form.FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group
                        as={Col}
                        className="p-0 mb-4"
                        onChange={handleInput}
                        value={formFields.password}
                    >
                        <PasswordFloatingLabelToggle uniqueId={"in-password"} />
                    </Form.Group>
                </Row>
                <Row>
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

export default LogInForm;
