import { Container, Tab, Nav } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     localStorage.removeItem("storedUser");
    //     navigate(0);
    // };

    return (
        <div>
            <Container>
                <Sidebar />
            </Container>
        </div>
    );
};

export default Profile;
