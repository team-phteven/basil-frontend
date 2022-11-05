// import { Container, Tab, Nav } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     localStorage.removeItem("storedUser");
    //     navigate(0);
    // };

    // rendering sidebar instead of logout button
    return (
        // <Button onClick={handleClick}>Log Out</Button>;
        <Sidebar />
    );
};

export default Profile;
