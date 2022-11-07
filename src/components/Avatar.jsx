import styled from "styled-components"

const Avatar = ({ url, bgc }) => {
    return (
        <AvatarWrapper>
            <ProfilePic
                url={`url('${url ? url : "avatar.png"}')`}
            ></ProfilePic>
            <StatusLight bgc={bgc} />
        </AvatarWrapper>
    );
};

const AvatarWrapper = styled.div`
    width: 80px;
    height: 80px;
    position: relative;
`

const ProfilePic = styled.div`
    width: 80px;
    height: 80px;
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