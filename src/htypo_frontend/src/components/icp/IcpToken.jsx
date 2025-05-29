import React from "react";

function IcpToken() {

    const [fromPrincipal, setFromPrincipal] = React.useState("");
    const [toPrincipal, setToPrincipal] = React.useState("dn7kn-wn2ws-ln7j4-iyay3-ebsqf-b7ihh-z7cea-5hxvz-2f33h-bvo2i-nqe");
    const [amount, setAmount] = React.useState(0);
    const [result, setResult] = React.useState("");

    function handleChangeFrom(event) {
        const principal = event.target.value;
        setFromPrincipal(principal);
    }

    function handleChangeAmount(event) {
        const amount = event.target.value;
        setAmount(amount);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const toPrincipal = formData.get("toPrincipal");
        const amount = formData.get("amount");

        // Here you would typically send the data to your backend or blockchain
        // For demonstration, we will just set the result to show what was submitted
        setResult(`Transfer to: ${toPrincipal}, Amount: ${amount}`);        
    }

    return (
        <div className="icp-token-container">
            <form className="icp-token-form" onSubmit={handleSubmit}>
                <label className="icp-label" for="from">From</label><br />
                <input className="icp-id icp-input" name="from" placeHolder="Principal" value={fromPrincipal} onChange={handleChangeFrom} /><br />
                <label className="icp-label" for="to">To (Htypo ledger)</label><br />
                <input className="icp-id icp-input" name="to" placeHolder="Principal" value={toPrincipal} disabled={true} /><br />
                <label className="icp-label" for="amount">Amount</label><br />
                <input className="icp-input" placeHolder="Nat" value={amount} onChange={handleChangeAmount} /><br />
                <button className="icp-button" type="submit">Transfer</button>
            </form>
            <h2>{result}</h2>
        </div>
    );
}

export default IcpToken;