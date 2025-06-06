import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { AiFillSound, AiFillMuted } from "react-icons/ai";
import { HiPlay, HiPause } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";

const TypoSpeech = forwardRef((props, ref) => {

    const [voice, setVoice] = useState(null);
    const [pitch, setPitch] = useState(0.8);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(0.75);
    const [text, setText] = useState(props.defaultText || "");
    const [utterance, setUtterance] = useState(null);
    const [isMute, setIsMute] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSetting, setIsSetting] = useState(false);

    useImperativeHandle(ref, () => ({
        setText: (newText) => {
            setText(newText);
        },
        stop: () => {
            const speech = window.speechSynthesis;
            if (speech) {
                speech.cancel();
                setIsPaused(false);
            }
        },
        speak: (newText) => {
            setText(newText);
            if (!utterance) {
                handleVoicesChanged();
            }
            const speech = window.speechSynthesis;
            if (!isMute && utterance) {
                utterance.text = newText;
                utterance.addEventListener("end", handleUtteranceEnd);
                speech.speak(utterance);
            }
        },
    }));

    useEffect(() => {
        handleVoicesChanged();
    }, []);

    function handleVoicesChanged() {
        const speech = window.speechSynthesis;
        const voices = speech.getVoices();
        if (voice == null || utterance == null) {
            const korean = voices.filter((voice) => voice.name == "Google 한국의");
            setVoice(korean[0]);

            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = "ko-KR";
            utter.voice = korean[0];
            utter.pitch = pitch;
            utter.rate = rate;
            utter.volume = volume;
            utter.addEventListener("end", handleUtteranceEnd);
            setUtterance(utter);
        }
    }

    function handleUtteranceEnd(event) {
        if (props.onEnd) {
            props.onEnd();
        }
        setIsPaused(false);
    }

    function handleVoiceChange(event) {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices.find((v) => v.name === event.target.value));
    };

    function handlePitchChange(event) {
        setPitch(parseFloat(event.target.value));
    };

    function handleRateChange(event) {
        setRate(parseFloat(event.target.value));
    };

    function handleVolumeChange(event) {
        setVolume(parseFloat(event.target.value));
    };

    function handleClickPaused() {
        const speech = window.speechSynthesis;
        if (isPaused) {
            speech.resume();
        } else {
            if (!isMute) {
                console.log(text);
                utterance.text = text;
                speech.speak(utterance);
            }
        }
        setIsPaused(!isPaused);
    }

    function handleClickMute() {
        setIsMute(!isMute);
    }

    function handleClickSetting() {
        setIsSetting(!isSetting);
    }

    return (
        <div className="typo-speech">
            <div>
                {isMute ? <AiFillMuted
                    onClick={handleClickMute}
                    style={{ color: 'red', fontSize: '35px' }}
                /> : <AiFillSound
                    onClick={handleClickMute}
                    style={{ color: 'red', fontSize: '35px' }}
                />}
                {isPaused ? <HiPause
                    onClick={handleClickPaused}
                    style={{ color: 'blue', fontSize: '35px' }}
                /> : <HiPlay
                    onClick={handleClickPaused}
                    style={{ color: 'blue', fontSize: '35px' }}
                />}
                <IoIosSettings
                    onClick={handleClickSetting}
                    style={{ color: 'blue', fontSize: '35px' }}
                />
            </div>
            {isSetting &&
                <div>
                    <label>
                        Voice:
                        <select value={voice?.name} onChange={handleVoiceChange}>
                            {window.speechSynthesis.getVoices().map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Pitch:
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={handlePitchChange}
                        />
                    </label>
                    <br />
                    <label>
                        Speed:
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={handleRateChange}
                        />
                    </label>
                    <br />
                    <label>
                        Volume:
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </label>
                </div>
            }
        </div>
    );
});

export default TypoSpeech;