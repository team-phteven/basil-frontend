import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Settings = () => {
    return (
        <SettingsCol className="p-2 bg-black text-white">
            <h3>Settings</h3>
        </SettingsCol>
    );
};

const SettingsCol = styled(Col)``;

export default Settings;
