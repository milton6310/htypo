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
        title: "Bookmarks",
        path: "/bookmarks",
        icon: <IoIosPaper />,
        classname: "nav-text",
    },
    {
        title: "Essays",
        path: "/essays",
        icon: <FaCartPlus />,
        classname: "nav-text",
    },
];