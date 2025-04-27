import React, { useState } from "react";
import { Principal } from "@dfinity/principal";

function Balance() {

    const [inputId, setInputId] = useState("");
    const [balanceResult, setBalance] = useState("");
    const [cryptoSymbol, setSymbol] = useState("");
    const [isHidden, setHidden] = useState(true);

    getCryptoSymbol();

    async function getCryptoSymbol() {
        setSymbol(await htypo.getSymbol());
    };

    async function handleClick() {
        // console.log(inputId);
        const principal = Principal.fromText(inputId);
        const balance = await htypo.balanceOf(principal);
        setBalance(balance.toLocaleString());
        setHidden(false);
    }

    return (
        <div className="token-window white">
            <label>Check account token balance:</label>
            <p>
                <input
                    className="token-input"
                    id="balance-principal-id"
                    type="text"
                    placeholder="Enter a Principal ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                />
            </p>
            <p className="trade-buttons">
                <button
                    className="token-button"
                    id="btn-request-balance"
                    onClick={handleClick}
                >
                    Check Balance
                </button>
            </p>
            <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
        </div>
    );
}

export default Balance;
