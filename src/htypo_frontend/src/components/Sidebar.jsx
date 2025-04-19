import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { TbAlphabetKorean } from "react-icons/tb";

export const SidebarLinks = [
    {
        title: "Practice",
        path: "/",
        icon: <TbAlphabetKorean />,
        classname: "nav-text",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <IoIosPaper />,
        classname: "nav-text",
    },
    {
        title: "Products",
        path: "/products",
        icon: <FaCartPlus />,
        classname: "nav-text",
    },
];