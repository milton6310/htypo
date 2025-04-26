import React, { useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Timer(props) {
    const [startingTime, setStartingTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const intervalRef = useRef(null);

    let secondsLeft = props.duration;
    if (startingTime != null && currentTime != null) {
        let timeElapsed = Math.floor((currentTime - startingTime) / 1000);
        secondsLeft = props.duration - timeElapsed;
        if (secondsLeft <= 0) {
            clearInterval(intervalRef.current);
            setCurrentTime(null);
            setIsStarted(false);
            props.onEnd();
        }
    }

    function handleStart() {
        setStartingTime(Date.now());
        setIsStarted(true);
        clearInterval(intervalRef.current);
        props.onStart();
        intervalRef.current = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    }

    return (
        <div className="play-timer-container">
            <Form.Label className="play-timer-label">
                {(secondsLeft <= 0) ? "Time's Up" : secondsLeft}
            </Form.Label>
            <Button className="play-timer-button" variant="primary" onClick={handleStart} disabled={isStarted}>
                Start
            </Button>
        </div>
    );
}

export default Timer;
