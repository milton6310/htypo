import React, { useState, useRef } from "react";
import TypoKeyboard from "./TypoKeyboard";
import TypoSpeech from "./TypoSpeech";
import Timer from "./Timer";
import { level_10 } from "../Dictionary";

function TypoToSpeech(props) {

    const defaultSpeechWord = "Enter word to speak out.";

    const [words, setWords] = useState(level_10.words);
    const [currentWord, setCurrentWord] = useState(defaultSpeechWord);
    const [typedWord, setTypedWord] = useState("");
    const speechRef = useRef(null);
    const inputRef = useRef(null);
    const timerRef = useRef(null);

    function handleChangeTypo(text) {
        setTypedWord(text);
    }

    function handleEnterTypo(text) {
        const inputWord = typedWord.replace(" ", "");
        setCurrentWord(inputWord);
        speechRef.current.speak(inputWord);
    }

    function handleEndOfSpeak() {
        if (timerRef.current.isStarted()) {
            speakNextWord();
        } else {
            speechRef.current.stop();
        }
    }

    function speakNextWord() {
        const nextIndex = Math.floor(Math.random() * words.length);
        const nextWord = words[nextIndex];
        setCurrentWord(nextWord);
        speechRef.current.speak(nextWord);
    }

    function handleStartTimer() {
        timerRef.current.start();
        speakNextWord();
    }

    function handleEndTimer() {
        timerRef.current.stop();
    }

    return (
        <div className="play-panel">
            <div className="play-panel-speech">
                <TypoSpeech ref={r => speechRef.current = r} defaultText={defaultSpeechWord} onEnd={handleEndOfSpeak} />
            </div>
            <div className="play-words">
                <p id="target">{currentWord}</p>
            </div>
            <div className="play-input-container">
                <TypoKeyboard ref={r => inputRef.current = r} onChange={handleChangeTypo} onEnter={handleEnterTypo} />
            </div>
            <Timer ref={r => timerRef.current = r} duration={process.env.TYPO_PLAYTIME} onStart={handleStartTimer} onEnd={handleEndTimer} />
        </div>
    );
}

export default TypoToSpeech;