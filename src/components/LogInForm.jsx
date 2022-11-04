// packages
import { useEffect, useState } from "react";
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
    // state for form errors
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });
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
        const welcome = JSON.parse(localStorage.getItem("welcomeBack"));
        setWelcomeBack(welcome);
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
        setLoading(true);
        try {
            // create new user session
            const { data } = await axios
                .post("http://localhost:5000/api/users/log-in", {
                    email,
                    password,
                }).catch((error) => {
                    const error_code = JSON.stringify(
                        error.response.data.error
                    );
                    console.log(error_code)
                    filterFormError(error_code);
                    setLoading(false);
                    return;
                })
            // store new user session in local storage
            localStorage.setItem("storedUser", JSON.stringify(data));
            localStorage.setItem(
                "welcomeBack",
                JSON.stringify({ email: email, name: data.name })
            );
                setLoading(false)
            // refresh page
            navigate(0);
        } catch (error) {
            setLoading(false);
        }
    };

    const filterFormError = (errors) => {
        errors.map((error) => {
            switch (error) {
                case "WEAK_PASSWORD":
                    setFormErrors({
                        ...formErrors,
                        password:
                            "Must be > 8 characters long and contain at least a number, symbol, lowercase & uppercase letter.",
                    });
                    break;
                case "EMAIL_FORMAT":
                    setFormErrors({
                        ...formErrors,
                        email: "Must be in email address format e.g. example@mail.com",
                    });
                    break;
                case "WRONG_CREDENTIALS":
                    setFormErrors({
                        ...formErrors,
                        form: "This combination of email and password does not exist."
                    });
                    break;
            }
        });
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
            {welcomeBack && (
                <span className="fs-3 my-3 text-white text-center">
                    Welcome back, {welcomeBack.name.split(" ")[0]}
                </span>
            )}
            <Col as={Form} onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} className="p-0 mb-4">
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
