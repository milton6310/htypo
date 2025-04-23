import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import logo from "../assets/home-img.png";

function Bookmark() {
    return (
        <div>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Bookmark Title</Card.Title>
                    <Card.Subtitle>subtitle</Card.Subtitle>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Creator: Milton Kim</ListGroup.Item>
                    <ListGroup.Item>Date: 2025, 4. 20</ListGroup.Item>
                    <ListGroup.Item>Price: 10.99 USD</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Buy</Card.Link>
                    <Card.Link href="#">Publish</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}



export default Bookmark;