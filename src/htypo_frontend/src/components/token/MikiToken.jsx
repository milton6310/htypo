import React from "react";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import "./MikiToken.scss";

function MikiToken(props) {
    return (
        <div id="token-screen">
            <Faucet userPrincipal={props.userPrincipal} />
            <Balance />
            <Transfer />
        </div>
    );
}

export default MikiToken;