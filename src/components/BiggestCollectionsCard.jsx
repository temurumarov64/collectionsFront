import React from "react";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

function BiggestCollectionCard({ coll }) {
  return (
    <Card
      style={{
        width: "18rem",
        backgroundColor: "rgba(163,177,213, 0.2) ",
        color: "#000",
      }}
      className="card_item_review m-2"
    >
      <Card.Body>
        <Col className="d-flex justify-content-between">
          <Card.Title>Collection: {coll.name}</Card.Title>
        </Col>
        <Col className="d-flex justify-content-between">
          <Card.Subtitle className="mb-2 text-muted">
            Items: {coll.itemsCount}
          </Card.Subtitle>
        </Col>
        <Card.Text>{coll.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default BiggestCollectionCard;
