import React, { useState } from "react";
import hangul from "hangul-js";
import "./TypoInput.scss";

function TypoInput(props) {
    const [text, setText] = useState("");

    function handleKeyDown(event) {
        // console.log("key down", event.key);
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

    function handleChange(event) {
        // console.log("input changed");
    }

    return (
        <div className="typo-text">
            <input
                type="text"
                autoFocus={true}
                value={text}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
        </div>
    );
}

export default TypoInput;