import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Timer = forwardRef((props, ref) => {

    const [startingTime, setStartingTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const intervalRef = useRef(null);

    useImperativeHandle(ref, () => ({
        isStarted: () => {
            return isStarted;
        },
        start: () => {
            handleStart();
        },
        stop: () => {
            handleStop();
        }
    }));

    var secondsLeft = props.duration ? props.duration : 30;
    if (startingTime != null && currentTime != null) {
        let timeElapsed = Math.floor((currentTime - startingTime) / 1000);
        secondsLeft = props.duration - timeElapsed;
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            if (props.onEnd) {
                props.onEnd();
            }
        }
    }

    function handleStart() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setStartingTime(Date.now());
        intervalRef.current = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        setIsStarted(true);
    }

    function handleStop() {
        clearInterval(intervalRef.current);
        setStartingTime(null);
        setCurrentTime(null);
        setIsStarted(false);
    }

    function handleClick() {
        if (isStarted) {
            if (props.onEnd) {
                props.onEnd();
            }
        } else {
            if (props.onStart) {
                props.onStart();
            }
        }
    }

    return (
        <div className="play-timer-container">
            <Form.Label className="play-timer-label">
                {(secondsLeft <= 0) ? "Time's Up" : secondsLeft}
            </Form.Label>
            <Button className="play-timer-button" variant="primary" onClick={handleClick}>
                {isStarted ? "STOP" : "START"}
            </Button>
        </div>
    );
});

export default Timer;
