import React, { useEffect, useState } from "react";

import CreateArea from "./note/CreateArea";
import Note from "./note/Note";
import { htypo } from "../../../declarations/htypo";

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
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import imageSrc from "../assets/logo.png";

function Essay() {
    const [writing, setWriting] = useState({
        title: "",
        content: "",
        published: ""
    });
    const [writings, setWritings] = useState([]);

    useEffect(() => {
        fetchWritings();
    }, []);

    async function fetchWritings() {
        const writingsArray = await htypo.readWritings();
        setWritings(writingsArray);
        console.log(writingsArray);
    }

    function deleteWriting(id) {
        htypo.removeWriting(id);
        setWritings(prev => {
            return prev.filter((item, index) => {
                return index !== id;
            });
        });
    }

    function addWriting(newWriting) {
        htypo.createWriting(newWriting.title, newWriting.content, newWriting.published);
        setWritings(prev => {
            return [newWriting, ...prev];
        });
    }

    function handleTitleChange(event) {
        const date = (new Date()).toLocaleString();
        setWriting(prev => {
            return {
                ...prev,
                title: event.target.value,
                published: date
            }
        });
    }

    function handleContentChange(event) {
        const date = (new Date()).toLocaleString();
        setWriting(prev => {
            return {
                ...prev,
                content: event.target.value,
                published: date
            }
        });
    }

    function handleAddNewClick() {
        console.log("add new clicked", writing);
        addWriting(writing);
    }

    return (
        <>
            {/* <div>
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
            </div> */}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
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
                                            onChange={handleTitleChange}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingTextarea2" label="Content">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{ height: '100px' }}
                                            onChange={handleContentChange}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={4} md={2} lg={2}>
                                    <div className="d-flex gap-2">
                                        <Button variant="primary" size="sm" onClick={handleAddNewClick}>
                                            Add New
                                        </Button>
                                        <Button variant="secondary" size="sm">
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
                                    <th>Created Date</th>
                                    <th>Subscribed</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>0</td>
                                    <td><RiDeleteBin5Line /><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>35</td>
                                    <td><BiEdit /></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default Essay;