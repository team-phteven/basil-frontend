// Packages
import { useState } from "react";
import styled from "styled-components";
// Contexts
import { useUser } from "../../contexts/UserProvider"; 

const GroupAvatar = ({users, size}) => {
    
    // set spacer state
    const [spacer, setSpacer] = useState(5);
    // destructure user provider
    const { localUser } = useUser();
    
    // filter local user out of users array
    const otherUsers = users.filter((user) => {
        return user.email !== localUser.email
    })

    return (
        <AvatarWrapper
            // increase spacer when hovered
            onMouseEnter={() => {
                setSpacer(20);
            }}
            onMouseLeave={() => {
                setSpacer(5);
            }}
            size={size}
        >
            {/* take first three users and map */}
            {otherUsers.slice(0, 3).map((user, index) => {
                return (
                    // make each pic (index*spacer)px to the right and down
                    <ProfilePic
                        key={index}
                        url={`url(${user.avatar})`}
                        pos={`${index * spacer}px`}
                    >
                        {/* on the third pic, if there are more, render "x more" */}
                        {index === 2 && otherUsers.length > 3 && (
                            <PlusMore
                                size={spacer > 5 ? "12px" : "0px"}
                                background={spacer > 5 ? "var(--violet)" : "transparent"}
                            >
                                <span>{`+${otherUsers.length - 3} more`}</span>
                            </PlusMore>
                        )}
                    </ProfilePic>
                );
            })}
        </AvatarWrapper>
    );
};

const AvatarWrapper = styled.div`
    width: ${(props) => props.size || "60px"};
    height: ${(props) => props.size || "60px"};
    margin: 0;
    padding: 0;
    position: relative;
`;

const PlusMore = styled.div`
    background-color: ${(props) => props.background};
    border-radius: 10px;
    text-align: center;
    font-size: ${(props) => props.size};
    color: white;
    position: absolute;
    padding: 1.5px;
    bottom: 0;
    transition: 0.5s;
    right: -15px;
`

const ProfilePic = styled.div`
    width: 90%;
    height: 90%;
    border-radius: 50%;
    position: absolute;
    top: ${(props) => props.pos};
    left: ${(props) => props.pos};
    background-color: var(--midgrey);
    background-size: cover;
    background-image: ${(props) => props.url};
    background-repeat: no-repeat;
    background-position: center top;
    transition: 0.5s;
    `;

export default GroupAvatar;
