import React, { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import useSound from "use-sound";
import Timer from "./Timer";
import TypoSpeech from "./TypoSpeech";
import TypoKeyboard from "./TypoKeyboard";
import level_0_1, { skill_levels, level_1, level_10, level_10_9_itchy } from "../Dictionary";
import 'bootstrap/dist/css/bootstrap.css';
import catSfx from "../../assets/sounds/Cat.mp3";
import earlySfx from "../../assets/sounds/Early.mp3";
import glassSfx from "../../assets/sounds/Glass.mp3";

function Typo() {

    const [words, setWords] = useState(level_0_1.words);
    const [skillLevel, setSkillLevel] = useState(1);
    const [selectLevel, setSelectLevel] = useState();
    const [practice, setPractice] = useState();
    const [practiceResult, setPracticeResult] = useState();
    const [isLevelSelected, setIsLevelSelected] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentWord, setCurrentWord] = useState("Type letters here until time's up!");
    const [typedWord, setTypedWord] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [playResult, setPlayResult] = useState({ "totalWords": 0, "correctCount": 0, "letterPerSec": 0, "letterPerMin": 0 });
    const [errorSound] = useSound(catSfx, { volume: 0.5 });
    const [playEndSound] = useSound(earlySfx, { volume: 0.5 });
    const [glassSound] = useSound(glassSfx, { volume: 0.5 });
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const speechRef = useRef(null);

    useEffect(() => {
        setSelectLevel(
            !isLevelSelected ? (
                <div className="play-level-select">
                    <Form className="play-level-select-form">
                        <Form.Label className="play-level-form-label">Select Level</Form.Label>
                        {skill_levels.map((level, key) => (
                            <div key={key} className="mb-3">
                                <Form.Check type="radio" id={level.id}>
                                    <Form.Check.Input name="typo-levels" type="radio" isValid={skillLevel == level.id} defaultChecked={level.id == skillLevel} onChange={handleChangeLevel} />
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
            ) : null
        );
        setPractice(
            isLevelSelected && !isStarted ? (
                <div className="play-panel">
                    <div className="play-panel-speech">
                        <TypoSpeech ref={r => speechRef.current = r} />
                    </div>
                    <div className="play-words">
                        <p id="target">{currentWord}</p>
                    </div>
                    <div className="play-input-container">
                        <TypoKeyboard ref={r => inputRef.current = r} onChange={handleTypoChange} onEnter={handleTypoEnter} />
                    </div>
                    <Timer ref={r => timerRef.current = r} duration={process.env.TYPO_PLAYTIME} onStart={handleStartTimer} onEnd={handleEndTimer} />
                </div>
            ) : null
        );
        setPracticeResult(
            isLevelSelected && isFinished ? (
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
            ) : null
        );
    }, [isLevelSelected, isStarted, isFinished, currentWord, typedWord]);

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

    function handleContinue() {
        setIsLevelSelected(true);
        setIsStarted(false);
        setIsFinished(false);
        setTotalCount(0);
        setCorrectCount(0);
    }

    function handleTypoChange(text) {
        setTypedWord(text);
    }

    function handleTypoEnter(text) {
        const targetWord = currentWord.replace(" ", "");
        const inputWord = typedWord.replace(" ", "");

        if (targetWord == inputWord) {
            const newCount = correctCount + 1;
            setCorrectCount(newCount);
            glassSound();
        } else {
            errorSound();
        }
        setTypedWord("");
        getNextWord();
    }

    function handleStartTimer() {
        timerRef.current.start();
        resetPlayResult();
        getNextWord();
        inputRef.current.focus();
    }

    function handleEndTimer() {
        timerRef.current.stop();
        updatePlayResult();
        setIsStarted(true);
        setIsFinished(true);
    }

    function getNextWord() {
        const nextIndex = Math.floor(Math.random() * words.length);
        const nextWord = words[nextIndex];
        setCurrentWord(nextWord);
        speechRef.current.speak(nextWord);
        const wordsCount = totalCount + 1;
        setTotalCount(wordsCount);
    }

    function resetPlayResult() {
        setPlayResult({ "totalWords": 0, "correctCount": 0, "letterPerSec": 0, "letterPerMin": 0 });
    }

    function updatePlayResult() {
        const speed = Math.floor((correctCount / process.env.TYPO_PLAYTIME) * 100) / 100;
        const speedMin = Math.floor(speed * 60 * 100) / 100;
        const status = { ...playResult, "totalWords": totalCount, "correctCount": correctCount, "letterPerSec": speed, "letterPerMin": speedMin };
        playEndSound();
        setPlayResult(status);
    }

    function handlePlayAgain() {
        setCurrentWord("Type in the word comes here until time's up!");
        setIsFinished(false);
        setIsStarted(false);
        setIsLevelSelected(true);
        resetPlayResult();
        setTotalCount(0);
        setCorrectCount(0);
    }

    function handleSelectLevel() {
        setCurrentWord("Type in the word comes here until time's up!");
        setIsFinished(false);
        setIsStarted(false);
        setIsLevelSelected(false);
        resetPlayResult();
        setTotalCount(0);
        setCorrectCount(0);
    }

    return (
        <>
            {selectLevel}
            {practice}
            {practiceResult}
        </>
    )
}

export default Typo;
