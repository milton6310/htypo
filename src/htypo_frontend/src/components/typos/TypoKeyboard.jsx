import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import hangul from "hangul-js";
import "react-simple-keyboard/build/css/index.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardHide } from "react-icons/md";
import "./TypoKeyboard.scss";

const koreanLayout = {
    'default': [
        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        '{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] \\',
        '{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; \' {enter}',
        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}',
        '.com @ {space}'
    ],
    'shift': [
        '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
        '{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ { } |',
        '{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ &lt; &gt; ? {shift}',
        '.com @ {space}'
    ]
};

const displayOptions = {
    "{bksp}": "DEL ⌫",
    "{enter}": "ENTER ↵",
    "{tab}": "TAB ⇥",
    "{lock}": "LOCK ⇪",
    "{shift}": "SHIFT ⇧",
    "{.}": ".",
    "{space}": " ",
    "{dot}": ".",
    "{pre}": "←",
};

const TypoKeyboard = forwardRef((props, ref) => {

    const [text, setText] = useState("");
    const [layoutName, setLayoutName] = useState("default");
    const [isHidden, setIsHidden] = useState(true);
    const [caretPosition, setCaretPosition] = useState(0);
    const inputRef = useRef(null);
    const keyboardRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
    }));

    function handleKeyDown(event) {
        event.preventDefault();
        let letter;
        switch (event.key) {
            case "q": letter = "ㅂ"; break;
            case "Q": letter = "ㅃ"; break;
            case "w": letter = "ㅈ"; break;
            case "W": letter = "ㅉ"; break;
            case "e": letter = "ㄷ"; break;
            case "E": letter = "ㄸ"; break;
            case "r": letter = "ㄱ"; break;
            case "R": letter = "ㄲ"; break;
            case "t": letter = "ㅅ"; break;
            case "T": letter = "ㅆ"; break;
            case "y": letter = "ㅛ"; break;
            case "Y": letter = "ㅛ"; break;
            case "u": letter = "ㅕ"; break;
            case "U": letter = "ㅕ"; break;
            case "i": letter = "ㅑ"; break;
            case "I": letter = "ㅑ"; break;
            case "o": letter = "ㅐ"; break;
            case "O": letter = "ㅒ"; break;
            case "p": letter = "ㅔ"; break;
            case "P": letter = "ㅖ"; break;
            case "a": letter = "ㅁ"; break;
            case "A": letter = "ㅁ"; break;
            case "s": letter = "ㄴ"; break;
            case "S": letter = "ㄴ"; break;
            case "d": letter = "ㅇ"; break;
            case "D": letter = "ㅇ"; break;
            case "f": letter = "ㄹ"; break;
            case "F": letter = "ㄹ"; break;
            case "g": letter = "ㅎ"; break;
            case "G": letter = "ㅎ"; break;
            case "h": letter = "ㅗ"; break;
            case "H": letter = "ㅗ"; break;
            case "j": letter = "ㅓ"; break;
            case "J": letter = "ㅓ"; break;
            case "k": letter = "ㅏ"; break;
            case "K": letter = "ㅏ"; break;
            case "l": letter = "ㅣ"; break;
            case "L": letter = "ㅣ"; break;
            case "z": letter = "ㅋ"; break;
            case "Z": letter = "ㅋ"; break;
            case "x": letter = "ㅌ"; break;
            case "X": letter = "ㅌ"; break;
            case "c": letter = "ㅊ"; break;
            case "C": letter = "ㅊ"; break;
            case "v": letter = "ㅍ"; break;
            case "V": letter = "ㅍ"; break;
            case "b": letter = "ㅠ"; break;
            case "B": letter = "ㅠ"; break;
            case "n": letter = "ㅜ"; break;
            case "N": letter = "ㅜ"; break;
            case "m": letter = "ㅡ"; break;
            case "M": letter = "ㅡ"; break;
            case "Shift": letter = ""; break;
            case "CapsLock": letter = ""; break;
            case "Control": letter = ""; break;
            case "Alt": letter = ""; break;
            case "Tab": letter = ""; break;
            case "Enter": letter = ""; break;
            case "NumLock": letter = ""; break;
            case "Delete": letter = ""; break;
            case "Insert": letter = ""; break;
            case "Escape": letter = ""; break;
            case "PageUp": letter = ""; break;
            case "PageDown": letter = ""; break;
            case "Home": letter = ""; break;
            case "End": letter = ""; break;
            case "Meta": letter = ""; break;
            default: letter = event.key;
        }
        let newInput;
        if (event.key === "Backspace") {
            newInput = text.slice(0, -1);
        } else {
            newInput = text + letter;
        }
        const newText = hangul.assemble(hangul.disassemble(newInput));
        setText(newText);
        if (event.key === "Enter") {
            if (props.onEnter) {
                props.onEnter(newText);
            }
            setText("");
        } else {
            if (props.onChange) {
                props.onChange(newText);
            }
        }
    }

    function handleChangeInput(event) {
        console.log("input changed");
    }

    function handleChange(input) {
        console.log("keyboard input changed");
        setCaretPosition(caretPosition + input.length);
    }

    function handleKeyPress(key) {
        console.log("keyboard button pressed", key);
        let newText = text;
        if (key === "{bksp}") {
            newText = text.slice(0, -1);
            setText(newText);
        } else if (key === "{shift}") {
            setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
        } else if (key === "{tab}") {
            console.log("tab clicked!");
        } else if (key === "{lock}") {
            console.log("tab clicked!");
        } else if (key === "{enter}") {
            if (props.onEnter) {
                props.onEnter(newText);
            }
            newText = "";
        } else if (key === "{dot}") {
            newText = newText + ".";
        } else if (key === "{space}") {
            newText = newText + " ";
        } else {
            newText = hangul.assemble(hangul.disassemble(newText + key));
        }
        setText(newText);
        if (props.onChange) {
            props.onChange(newText);
        }
    }

    function handleClickHide() {
        setIsHidden(!isHidden);
        inputRef.current.focus();
    }

    function handleCaretChange(pos) {
        setCaretPosition(pos);
        console.log("caret position changed", pos);
    }

    return (
        <div className="typo-keyboard">
            <input
                ref={inputRef}
                value={text}
                autoFocus={true}
                onKeyDown={handleKeyDown}
                onChange={handleChangeInput}
            />
            {isHidden ? <MdKeyboardHide
                onClick={handleClickHide}
                style={{ color: 'black', fontSize: '35px' }}
            /> : <MdKeyboardDoubleArrowUp
                onClick={handleClickHide}
                style={{ color: 'black', fontSize: '35px' }}
            />}
            {!isHidden &&
                <Keyboard
                    ref={r => (keyboardRef.current = r)}
                    buttonTheme={[
                        {
                        class: "highlight-key",
                        buttons: "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅒ ㅖ"
                        }
                    ]}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    caretPosition={caretPosition}
                    onCaretPositionChange={handleCaretChange}
                    layoutName={layoutName}
                    layout={{ ...koreanLayout }}
                    physicalKeyboardHighlight={true}
                    physicalKeyboardHighlightPress={true}
                    physicalKeyboardHighlightBgColor={"#9ab4d0"}
                    syncInstanceInputs={true}
                    display={displayOptions}
                />
            }
        </div>
    );
});

export default TypoKeyboard;