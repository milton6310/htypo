import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import useSound from "use-sound";
import Timer from "./Timer";
import TypoSpeech from "./TypoSpeech";
import TypoKeyboard from "./TypoKeyboard";
import level_0_1, { skill_levels, level_1, level_10, level_10_9_itchy } from "./Dictionary";
import 'bootstrap/dist/css/bootstrap.css';
import "./Typo.scss";
import catSfx from "../assets/sounds/Cat.mp3";
import earlySfx from "../assets/sounds/Early.mp3";
import glassSfx from "../assets/sounds/Glass.mp3";

function Typo() {
    const [skillLevel, setSkillLevel] = useState(1);
    const [words, setWords] = useState(level_0_1.words);
    const [isLevelSelected, setIsLevelSelected] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [currentWord, setCurrentWord] = useState("Type letters here until time's up!");
    const [typedWord, setTypedWord] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [playResult, setPlayResult] = useState(null);
    const [errorSound] = useSound(catSfx, { volume: 0.5 });
    const [playEndSound] = useSound(earlySfx, { volume: 0.5 });
    const [glassSound] = useSound(glassSfx, { volume: 0.5 });

    function timeStarted() {
        setPlayResult({ "totalWords": null, "correctCount": null, "letterPerSec": null, "letterPerMin": null });
        setIsEnded(false);
        const startIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[startIndex]);
        const wordsCount = totalCount + 1;
        setTotalCount(wordsCount);
    }

    function timesUp() {
        const speed = Math.floor((correctCount / process.env.TYPO_PLAYTIME) * 100) / 100;
        const speedMin = Math.floor(speed * 60 * 100) / 100;
        const status = { ...playResult, "totalWords": totalCount, "correctCount": correctCount, "letterPerSec": speed, "letterPerMin": speedMin };
        playEndSound();
        setIsEnded(true);
        setPlayResult(status);
    }

    function handleTypoChange(text) {
        setTypedWord(text);
    }

    function handleTypoEnter(text) {
        const targetWord = currentWord.replace(" ", "");
        const inputWord = typedWord.replace(" ", "");

        if (targetWord == inputWord) {
            console.log("user entered correct word");
            const newCount = correctCount + 1;
            setCorrectCount(newCount);
            glassSound();
        } else {
            errorSound();
        }
        const nextIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[nextIndex]);
        setTypedWord("");
        const wordsCount = totalCount + 1;
        setTotalCount(wordsCount);
    }

    function handlePlayAgain() {
        setCurrentWord("Type in the word comes here until time's up!");
        setIsEnded(false);
    }

    function handleSelectLevel() {
        setCurrentWord("Type in the word comes here until time's up!");
        setIsEnded(false);
        setIsLevelSelected(false);
    }

    function handleContinue() {
        setIsLevelSelected(true);
    }

    function handleChangeLevel(event) {
        const levelId = event.target.id;
        if (levelId == 2) {
            setWords(level_1.words);
        } else if (levelId == 3) {
            setWords(level_10.words);
        } else if (levelId == 4) {
            setWords(level_10_9_itchy.words);
        } else {
            setWords(level_0_1.words);
        }
        setSkillLevel(levelId);
    }

    if (isLevelSelected) {
        if (!isEnded) {
            return (
                <div className="play-panel">
                    <div className="play-panel-speech">
                        <TypoSpeech text={currentWord} />
                    </div>
                    <div className="play-words">
                        <p id="target">{currentWord}</p>
                    </div>
                    <div className="play-input-container">
                        <TypoKeyboard onChange={handleTypoChange} onEnter={handleTypoEnter} />
                    </div>
                    <Timer duration={process.env.TYPO_PLAYTIME} onStart={timeStarted} onEnd={timesUp} />
                </div>
            );
        } else {
            return (
                <div className="play-status">
                    <Form.Label className="play-status-label">Play Result</Form.Label>
                    <Table className="play-status-table" striped bordered hover>
                        <tbody>
                            <tr>
                                <td>Total Words</td>
                                <td>{playResult.totalWords}</td>
                            </tr>
                            <tr>
                                <td>Correct Count</td>
                                <td>{playResult.correctCount}</td>
                            </tr>
                            <tr>
                                <td>Letters Per Second</td>
                                <td>{playResult.letterPerSec}</td>
                            </tr>
                            <tr>
                                <td>Letters Per Minute</td>
                                <td>{playResult.letterPerMin}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="play-status-buttons">
                        <Button className="play-status-button" variant="primary" onClick={handlePlayAgain}>Play Again</Button>
                        <Button className="play-status-button" variant="success" onClick={handleSelectLevel}>Change Level</Button>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div className="play-level-select">
                <Form className="play-level-select-form">
                    <Form.Label className="play-level-form-label">Select Level</Form.Label>
                    {skill_levels.map((level, key) => (
                        <div key={key} className="mb-3">
                            <Form.Check type="radio" id={level.id}>
                                <Form.Check.Input name="typo-levels" type="radio" isValid={skillLevel == level.id} defaultChecked={level.id == 1} onChange={handleChangeLevel} />
                                <Form.Check.Label>{level.label}</Form.Check.Label>
                                <Form.Control.Feedback className="level-form-feedback" type="valid">
                                    <em>{level.feedback}</em>
                                </Form.Control.Feedback>
                            </Form.Check>
                        </div>
                    ))}
                    <Button className="play-level-select-button" variant="primary" onClick={handleContinue}>Continue</Button>
                </Form>
            </div>
        );
    }
}

export default Typo;
