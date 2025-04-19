import React from "react";

function Footer(props) {
    return (
        <footer>
            <p>Copyright ⓒ {new Date().getFullYear()} <span>{process.env.TYPO_CREATOR_BY}</span></p>
        </footer>
    );
}

export default Footer;
