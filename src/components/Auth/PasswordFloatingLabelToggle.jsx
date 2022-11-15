import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// REMEMBER TO USE THIS INSIDE <Form.Group> WITH CONTROLLED INPUT

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
                    required
                />
            </Form.FloatingLabel>
            <InputGroup.Text onClick={toggleShowPassword}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </InputGroup.Text>
        </InputGroup>
    );
};

export default PasswordFloatingLabelToggle;
