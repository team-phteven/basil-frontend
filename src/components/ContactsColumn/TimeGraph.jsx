import { useEffect, useState } from "react";
import styled from "styled-components";

const TimeGraph = ({ seconds, percentage }) => {
    // const [value, setValue] = useState("0%");

    // useEffect(() => {
    //     setTimeout(() => {
    //         setValue(percentage)
    //     }, 1000)
    // }, [])

    return (
        <OuterGraph value={percentage} color="var(--violet)">
            <InnerGraph>{seconds}</InnerGraph>
        </OuterGraph>
    );
};

export default TimeGraph;


const OuterGraph = styled.div`
    background: conic-gradient(
        var(--green) 0%,
        var(--green) calc(${(props) => props.value} - 20%),
        transparent calc(${(props) => props.value} + 5%),
        transparent 100%
    );
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: relative;
`;

const InnerGraph = styled.div`
    background-color: var(--violet);
    color: white;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    position: absolute;
    top: 15%;
    left: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;
