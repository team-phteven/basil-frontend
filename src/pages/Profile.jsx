import { Container, Tab, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    return <Button onClick={handleClick}>Log Out</Button>;
};

export default Profile;
