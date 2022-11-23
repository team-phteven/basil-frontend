// Packages
import { useState } from "react";
// BS Components
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
// Icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// USE THIS COMPONENT INSIDE <Form.Group> WITH CONTROLLED INPUT

const PasswordFloatingLabelToggle = (props) => {

    // state for show password toggle
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(showPassword ? false : true);
    };


    return (
        <InputGroup size="lg">
            <Form.FloatingLabel label={props.label || "Password"}>
                <Form.Control
                    id={props.uniqueId}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={props.value}
                    onChange={props.handleChange}
                    required
                />
            </Form.FloatingLabel>
            <InputGroup.Text data-testid="show" onClick={toggleShowPassword}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </InputGroup.Text>
        </InputGroup>
    );
};

export default PasswordFloatingLabelToggle;
