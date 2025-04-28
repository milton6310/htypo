import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

function NoteRow(props) {

    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        props.onEdit(props.id);
    }

    return (
        <tr>
            <td>{props.id + 1}</td>
            <td>{props.title}</td>
            <td>{props.content}</td>
            <td>{props.published}</td>
            <td>
                <RiDeleteBin5Line onClick={handleDeleteClick} />
                <BiEdit onClick={handleEditClick} />
            </td>
        </tr>
    );
}

export default NoteRow;