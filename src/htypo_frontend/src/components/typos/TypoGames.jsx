import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import TypoInput from "./TypoInput";
import useSound from "use-sound";
import catSfx from "../../assets/sounds/Cat.mp3";
import glassSfx from "../../assets/sounds/Glass.mp3";
import getRandom from "./Random";
import { level_1 } from "../Dictionary";

function TypoGames() {

    const [currentWord, setCurrentWord] = useState("");
    const [isWordHidden, setWordHidden] = useState(true);
    const [isStarted, setIsStarted] = useState(false);
    const [errorSound] = useSound(catSfx, { volume: 0.5 });
    const [glassSound] = useSound(glassSfx, { volume: 0.5 });
    const animateRef = useRef(null);
    const durationRef = useRef(null);
    const inputRef = useRef(null);
    const healthRef = useRef(null);
    const scoreRef = useRef(null);

    function startFallingWord() {
        // set target word
        const wordsSize = level_1.nwords;
        var rand = getRandom();
        const wordIndex = Math.floor(rand() * wordsSize);
        setCurrentWord(level_1.words[wordIndex]);

        // create word animation
        const panel = document.querySelector(".panel-middle");
        const panelStyle = window.getComputedStyle(panel);
        const panelWidth = parseInt(panelStyle.width) - 100;
        const panelHeight = parseInt(panelStyle.height) - 40;

        const startLeft = Math.floor(rand() * panelWidth + 1);
        const endLeft = Math.floor(rand() * panelWidth + 1);
        const startX = startLeft.toString() + 'px';
        const endX = endLeft.toString() + 'px';
        const startY = '10px';
        const endY = panelHeight.toString() + 'px';
        const dur = durationRef.current;
        const delay = 0;
        const iter = 1;
        const penalty = 20;
        const animation = animateRef.current.animate([
            { top: startY, left: startX },
            { top: endY, left: endX }
        ], {
            fill: "none",
            duration: dur,
            delay: delay,
            iterations: iter,
        }).finished.then(() => {
            setWordHidden(true);
            errorSound();
            const newHealth = healthRef.current - penalty;
            if (newHealth > 0) {
                healthRef.current = newHealth;
                startFallingWord();
            } else {
                healthRef.current = 0;
                setIsStarted(false);
                clearAnimations();
            }
        }).catch((error) => {
            console.log(error);
        });

        if (healthRef.current > 0) {
            setWordHidden(false);
            inputRef.current.focus();
        }
    }

    async function clearAnimations() {
        const animations = await animateRef.current.getAnimations();
        animations.forEach((animation, index) => {
            if (animation.playState == 'running') {
                animation.cancel();
            }
        });
    }

    function handleStartClick() {
        scoreRef.current = 0;
        healthRef.current = 100;
        durationRef.current = 10000;
        setIsStarted(true);
        startFallingWord();
    }

    async function handleTypoEnter(text) {
        const animations = await animateRef.current.getAnimations();
        animations.forEach((animation, index) => {
            if (animation.playState === 'running') {
                if (animateRef.current.innerText === text) {
                    scoreRef.current = scoreRef.current + 10;
                    if (scoreRef.current > 0 && scoreRef.current % 100 == 0) {
                        durationRef.current = durationRef.current - 1000;
                    }
                    glassSound();
                    animation.cancel();
                    startFallingWord();
                } else {
                    scoreRef.current = scoreRef.current - 20;
                    errorSound();
                }
            }
        });
    }

    return (
        <div className="game-container">
            <div className="game-panels">
                <div className="panel-left">
                    <h2>Health</h2>
                    <h3>{healthRef.current}</h3>
                    <h2>Score</h2>
                    <h3>{scoreRef.current}</h3>
                </div>
                <div className="panel-middle">
                    <Button
                        className="game-start-button"
                        hidden={isStarted}
                        onClick={handleStartClick}
                        variant="primary"
                    >
                        Start
                    </Button>
                    <div
                        ref={animateRef}
                        className="falling-word"
                        id="falling-word"
                        hidden={isWordHidden}
                    >
                        {currentWord}
                    </div>
                </div>
                <div className="panel-right">
                </div>
            </div>
            <div className="game-input">
                <TypoInput ref={inputRef} onEnter={handleTypoEnter} />
            </div>
        </div>
    );
}

export default TypoGames;