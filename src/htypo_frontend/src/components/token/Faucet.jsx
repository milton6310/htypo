import React, { useState } from "react";
import { canisterId, createActor } from "../../../../declarations/htypo";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

    const [isDisabled, setDisable] = useState(false);
    const [buttonText, setText] = useState("Gimme gimme");

    async function handleClick(event) {
        setDisable(true);
        const authClient = AuthClient.create();
        const identity = (await authClient).getIdentity();
        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });
        const buttonResult = await authenticatedCanister.payOut();
        setText(buttonResult);
        // setDisable(false);
    }

    return (
        <div className="blue token-window">
            <h2>
                <span className="token-span" role="img" aria-label="tap emoji">
                    🚰
                </span>
                Faucet
            </h2>
            <label>Get your free tokens here! Claim 10,000 MIKI tokens to {props.userPrincipal}.</label>
            <p className="trade-buttons">
                <button className="token-button" disabled={isDisabled} id="btn-payout" onClick={handleClick}>
                    {buttonText}
                </button>
            </p>
        </div>
    );
}

export default Faucet;
