import React from "react";
import MikiToken from "../components/token/MikiToken";

function Token(props) {
    return (
        <MikiToken userPrincipal={props.userInPrincipal} />
    );
}

export default Token;