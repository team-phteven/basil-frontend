import styled from "styled-components"

const Avatar = ({ url, bgc, size, hideStatus = false }) => {
    return (
        <AvatarWrapper size={size}>
            <ProfilePic
                data-testid="avatar"
                url={`url('${url ? url : "face.jpeg"}')`}
            ></ProfilePic>
            {hideStatus ? null : <StatusLight bgc={bgc} />}
        </AvatarWrapper>
    );
};

const AvatarWrapper = styled.div`
    width: ${(props) => props.size || "60px"};
    height: ${(props) => props.size || "60px"};
    position: relative;
    margin: 0;
    padding: 0;
`;

const ProfilePic = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-image: ${props => props.url};
    background-repeat: no-repeat;
    background-position: center top;
    position: absolute;
`

const StatusLight = styled.div`
    width: 30%;
    height: 30%;
    border: 2px solid ${props => props.bgc};
    background-color: rgb(0,255,0);
    border-radius: 50%;
    bottom: 0;
    right: 0;
    position: absolute;

`

export default Avatar;