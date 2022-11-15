// packages
import styled from "styled-components";
// custom components
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { PasswordForm } from "./PasswordForm"
// BS components
import Col from "react-bootstrap/Col";

import { AvatarForm } from "./AvatarForm";

function Settings() {

    return (
        <Menu className="p-2 m-0">
            <h2 className="text-white mb-4">Profile Settings</h2>
            <PersonalDetailsForm />
            <PasswordForm />
            <AvatarForm />
        </Menu>
    );
}

const Menu = styled(Col)`
    background: var(--darkgrey);
`;

export default Settings;
