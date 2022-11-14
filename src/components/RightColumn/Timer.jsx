import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Timer = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        return () => clearInterval(id.current);
    }, []);

    let id = useRef();

    function handelTime() {
        id.current = setInterval(() => {
            setTime((prev) => prev + 1);
            console.log(time);
        }, 1000);
    }

    return (
        <Row className="m-0 p-0">
            <Col className="vh-100 d-flex flex-column">
                <h1>{time}</h1>
                <button onClick={() => handelTime()}>Start</button>
                <button onClick={() => clearInterval(id.current)}>Pause</button>
                <button
                    onClick={() => {
                        clearInterval(id.current);
                        setTime(0);
                        console.log(time);
                    }}
                >
                    Reset
                </button>
            </Col>
        </Row>
    );
};

export default Timer;
