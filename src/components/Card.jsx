import React from "react";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

function CardItem({ colItem }) {
  return (
    <Card
      style={{ width: "18rem", backgroundColor: "#C0CDF3 ", color: "#000" }}
      className="card_item_review m-2"
    >
      <Card.Body>
        <Col className="d-flex justify-content-between">
          <Card.Title>Item: {colItem.name}</Card.Title>
        </Col>
        <Col className="d-flex justify-content-between">
          <Card.Subtitle className="mb-2 text-muted">
            User: {colItem.userName}
          </Card.Subtitle>
        </Col>
        <Card.Text>Collection: {colItem.collection.name}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default CardItem;
