import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    return (
        <div>
            <p style={{ color: "red" }}>Hello</p>
        </div>
    );
};

export default Sidebar;
