// Packages
import { useState } from "react";
import styled from "styled-components";
// Contexts
import { useUser } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
// Custom Components
import CreateGroupModal from "./CreateGroupModal";
import IconButton from "../GlobalComponents/IconButton";
// BS Components
import Avatar from "../GlobalComponents/Avatar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// Icons
import {
    MdOutlineLogout,
    MdSettings,
    MdGroup,
} from "react-icons/md";

const UserMenu = ({ menu, setMenu }) => {
    const { localUser } = useUser();

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("storedUser");
        navigate(0);
    };

    const toggleSettings = () => {
        setMenu(menu === "Settings" ? "Conversations" : "Settings");
    };

    const toggleContacts = () => {
        setMenu(menu === "Contacts" ? "Conversations" : "Contacts");
    };

            const [show, setShow] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);


    return (
        <UserMenuContainer>
            <StyledCol xs="auto">
                <Avatar url={localUser.avatar} bgc={"black"} size="50px" />
            </StyledCol>
            <NameCol xs="auto">
                <Name>{localUser.name}</Name>
            </NameCol>
            <StyledCol xs="auto">
                <StyledRow>
                    <IconButton
                        icon={MdGroup}
                        action={() => {
                            toggleContacts();
                        }}
                        size="25px"
                        color="var(--lightgrey)"
                    />
                    <IconButton
                        icon={MdSettings}
                        action={() => {
                            toggleSettings();
                        }}
                        color="var(--lightgrey)"
                        size="25px"
                    />
                    <IconButton
                        icon={MdOutlineLogout}
                        action={() => {
                            handleShow();
                        }}
                        color="var(--lightgrey)"
                        size="25px"
                    />
                </StyledRow>

                {/* LOG OUT MODAL */}
                <Modal show={show} onHide={handleClose} centered>
                    <LogOutModal>
                        <LogOutTitle>
                            Are you sure you want to log out?
                        </LogOutTitle>
                        <StyledButton variant="secondary" onClick={handleClose}>
                            Cancel
                        </StyledButton>
                        <StyledButton variant="primary" onClick={handleLogOut}>
                            Log Out
                        </StyledButton>
                    </LogOutModal>
                </Modal>
            </StyledCol>
        </UserMenuContainer>
    );
};

const Name = styled.span`
    margin: 0;
    padding: 0;
    color: white;
`

const UserMenuContainer = styled(Row)`
    background: var(--darkgrey);
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
`;

const LogOutTitle = styled(Modal.Title)`
    margin: 10px;
    color: white;
`;

const LogOutModal = styled(Modal.Body)`
    background: var(--darkgrey);
`;

const StyledButton = styled(Button)`
    margin: 10px;
`

const StyledRow = styled(Row)`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    gap: 10px;
`;

const StyledCol = styled(Col)`
    padding: 0;
    margin: 0;
`

const NameCol = styled(Col)`
    padding: 0;
    margin: 10px;
    flex-shrink: 1;
`;


export default UserMenu;
