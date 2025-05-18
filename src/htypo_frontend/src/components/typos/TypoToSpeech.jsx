import React, { forwardRef, useState, useRef } from "react";
import TypoKeyboard from "./TypoKeyboard";
import TypoSpeech from "./TypoSpeech";
import Timer from "./Timer";
import level_0_1, { skill_levels, level_1, level_10, level_10_9_itchy } from "../Dictionary";

const TypoToSpeech = forwardRef((props, ref) => {

    const [words, setWords] = useState(level_0_1.words);
    const [isEnded, setIsEnded] = useState(false);
    const [currentWord, setCurrentWord] = useState("Enter word to speak out.");
    const [typedWord, setTypedWord] = useState("");
    const speechRef = useRef(null);
    const inputRef = useRef(null);

    function timeStarted() {
        setIsEnded(false);
        const startIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[startIndex]);
    }

    function timesUp() {
        setIsEnded(true);
    }

    function handleChangeTypo(text) {
        setTypedWord(text);
    }

    function handleEnterTypo(text) {
        const inputWord = typedWord.replace(" ", "");
        setCurrentWord(inputWord);
        speechRef.current.speak(inputWord);
    }

    return (
        <div className="play-panel">
            <div className="play-panel-speech">
                <TypoSpeech ref={r => speechRef.current = r} text={currentWord} />
            </div>
            <div className="play-words">
                <p id="target">{currentWord}</p>
            </div>
            <div className="play-input-container">
                <TypoKeyboard ref={r => inputRef.current = r} onChange={handleChangeTypo} onEnter={handleEnterTypo} />
            </div>
            <Timer duration={process.env.TYPO_PLAYTIME} onStart={timeStarted} onEnd={timesUp} />
        </div>
    );
});

export default TypoToSpeech;