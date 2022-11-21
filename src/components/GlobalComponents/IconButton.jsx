// Packages
import styled from 'styled-components'
// BS Components
import Button from 'react-bootstrap/Button'

const IconButton = ({icon, action, size="30px", color="white"}) => {
  return <StyledIcon as={icon} onClick={action} size={size} color={color}/>;
}

const StyledIcon = styled(Button)`
    margin: 0;
    padding: 0;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    fill: ${(props) => props.color};
    cursor: pointer;
    &:hover {
        fill: var(--violet);
    }
`;
export default IconButton;