import React from "react";
import { SidebarLinks } from "./Sidebar";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

function Navbar(props) {
    console.log("navbar called", props.hidden);
    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>
                <nav className={(props.hidden) ? "nav-menu" : "nav-menu active"}>
                    <ul className="nav-menu-items">
                        {SidebarLinks.map((item, index) => {
                            return (
                                <li key={index} className={item.classname}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;