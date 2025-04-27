import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { canisterId, createActor } from "../../../../declarations/htypo";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

    const [recipientId, setId] = useState("");
    const [amount, setAmount] = useState("");
    const [isDisabled, setDisable] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isHidden, setHidden] = useState(true);

    async function handleClick() {
        setHidden(true);
        setDisable(true);
        let recipient = Principal.fromText(recipientId);
        let amountToTransfer = Number(amount);
        let authClient = AuthClient.create();
        let identity = (await authClient).getIdentity();
        let authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });
        let result = await authenticatedCanister.transfer(recipient, amountToTransfer);
        setFeedback(result);
        setHidden(false);
        setDisable(false);
    }

    return (
        <div className="token-window white">
            <div className="transfer">
                <fieldset className="token-fieldset">
                    <legend>To Account:</legend>
                    <ul>
                        <li>
                            <input
                                className="token-input"
                                type="text"
                                id="transfer-to-id"
                                value={recipientId}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset className="token-fieldset">
                    <legend>Amount:</legend>
                    <ul>
                        <li>
                            <input
                                className="token-input"
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <p className="trade-buttons">
                    <button className="token-button" id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
                        Transfer
                    </button>
                </p>
                <p hidden={isHidden}>{feedback}</p>
            </div>
        </div>
    );
}

export default Transfer;
