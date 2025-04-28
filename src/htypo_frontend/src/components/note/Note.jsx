import React, { useEffect, useState } from "react";
import NoteRow from "./NoteRow";
import { htypo } from "../../../../declarations/htypo";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import imageSrc from "../../assets/logo.png";

function Note(props) {

    const [note, setNote] = useState({
        title: "",
        content: "",
        published: ""
    });
    const [notes, setNotes] = useState([]);

    const [isNewNote, setIsNewNote] = useState(true);
    const [inputTitle, setInputTitle] = useState("");
    const [inputContent, setInputContent] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        const notesArray = await htypo.readNotes();
        setNotes(notesArray);
        console.log(notesArray);
    }

    function addNote(newNote) {
        htypo.createNote(newNote.title, newNote.content, newNote.published);
        setNotes(prev => {
            return [newNote, ...prev];
        });
    }

    function handleAddNewClick() {
        addNote(note);
        setInputTitle("");
        setInputContent("");
    }

    function handleUpdateClick() {
        console.log("note update called");
    }

    function handleResetClick() {
        console.log("note reset called");
        setIsNewNote(true);
        setInputTitle("");
        setInputContent("");
        setNote({
            title: "",
            content: "",
            published: ""
        });
    }

    function handleDeleteNote(id) {
        htypo.removeNote(id);
        setNotes(prev => {
            return prev.filter((item, index) => {
                return index !== id;
            });
        });
    }

    function handleEditNote(id) {
        setInputTitle(notes[id].title);
        setInputContent(notes[id].content);
        setIsNewNote(false);
    }

    function handleTitleChange(event) {
        const date = (new Date()).toLocaleString();
        setInputTitle(event.target.value);
        setNote(prev => {
            return {
                ...prev,
                title: event.target.value,
                published: date
            }
        });
    }

    function handleContentChange(event) {
        const date = (new Date()).toLocaleString();
        setInputContent(event.target.value);
        setNote(prev => {
            return {
                ...prev,
                content: event.target.value,
                published: date
            }
        });
    }

    return (
        <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Compose Essay</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row>
                            <Col xs={4} md={2} lg={2}>
                                <Image src={imageSrc} width="100%" rounded />
                            </Col>
                            <Col xs={4} md={8} lg={8}>
                                <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        value={inputTitle}
                                        onChange={handleTitleChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingTextarea2" label="Content">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        value={inputContent}
                                        style={{ height: '100px' }}
                                        onChange={handleContentChange}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={4} md={2} lg={2}>
                                <div className="d-flex gap-2">
                                    <Button variant="primary" size="sm" disabled={!isNewNote} onClick={handleAddNewClick}>
                                        Add New
                                    </Button>
                                    <Button variant="primary" size="sm" disabled={isNewNote} onClick={handleUpdateClick}>
                                        Update
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={handleResetClick}>
                                        Reset
                                    </Button>
                                    <Button variant="Primary" size="sm">
                                        Change Bookmark
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Essay Collection</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Pagination>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Ellipsis />

                                    <Pagination.Item>{10}</Pagination.Item>
                                    <Pagination.Item>{11}</Pagination.Item>
                                    <Pagination.Item active>{12}</Pagination.Item>
                                    <Pagination.Item>{13}</Pagination.Item>
                                    <Pagination.Item disabled>{14}</Pagination.Item>

                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{20}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </Col>
                            <Col>
                                <DropdownButton id="dropdown-item-button" title="Dropdown button">
                                    <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                                    <Dropdown.Item as="button">Action</Dropdown.Item>
                                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                                    <Dropdown.Item as="button">Something else</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Published Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((noteItem, index) => {
                                return (
                                    <NoteRow
                                        key={index}
                                        id={index}
                                        title={noteItem.title}
                                        content={noteItem.content}
                                        published={noteItem.published}
                                        onEdit={handleEditNote}
                                        onDelete={handleDeleteNote}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Note;
