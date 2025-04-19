import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";

function Header(props) {
    const [sidebar, setSidebar] = useState(false);

    function handleClickSidebar() {
        const newValue = !sidebar;
        setSidebar(newValue);
        if (props.onShowSidebar) {
            props.onShowSidebar(newValue);
        }
    }

    return (
        <header>
            <h1>
                Hangul Typo
            </h1>
            <IconContext.Provider value={{ color: "undefined" }}>
                <div className="navbar">
                    <FaIcons.FaBars onClick={handleClickSidebar} />
                </div>
            </IconContext.Provider>
        </header>
    );
}

export default Header;
