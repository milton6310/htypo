import React, { useEffect, useState } from "react";
import Note from "./note/Note";
import CreateArea from "./note/CreateArea";
import { htypo } from "../../../declarations/htypo";

function Essay() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        htypo.createNote(newNote.title, newNote.content);
        setNotes(prevNotes => {
            return [newNote, ...prevNotes];
        });
    }

    useEffect(() => {
        console.log("useEffect is triggered");
        fetchData();
    }, []);

    async function fetchData() {
        const notesArray = await htypo.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id) {
        htypo.removeNote(id);
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}
        </div>
    );
}

export default Essay;
