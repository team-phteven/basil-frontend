// Packages
import styled from "styled-components";
// Icons
import { MdGroupAdd, MdOutlineChatBubble } from "react-icons/md";

const CreateGroupButton = ({ action }) => {
    return (
        <ButtonWrap onClick={action}>
            <MdOutlineChatBubble color="var(--violet)" size="60px" />
            <StyledIcon color="var(--lightgrey)" size="30px" />
        </ButtonWrap>
    );
};

export default CreateGroupButton;

const StyledIcon = styled(MdGroupAdd)`
    margin-top: 10px;
    position: fixed;
`;

const ButtonWrap = styled.div`
    pointer-events: auto;
    display: flex;
    justify-content: center;
    align-items: start;
    cursor: pointer;
    filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.5));
    transition: 0.5s;
    &:hover {
        transform: translateY(-10px);
        filter: drop-shadow(10px 10px 6px rgba(0, 0, 0, 0.5));
    }
`;
