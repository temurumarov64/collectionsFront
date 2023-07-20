import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { deleteCollectionApi } from "../api/collections";

function Collection({ collection, handleShow, fetchCollections }) {
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/collections/${id}/collection-items`;
    navigate(path);
  };

  const handleOpenModal = (collection) => {
    handleShow(collection);
  };

  const deleteCollection = (e) => {
    e.preventDefault();

    deleteCollectionApi(collection.id)
      .then((res) => {
        fetchCollections();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div>
        <Card style={{ width: "14rem" }} className="card_item_review m-2">
          <Card.Img
            style={{
              objectFit: "cover",
              borderRadius: 1,
              width: "14rem",
              height: "12rem",
            }}
            variant="top"
            src={collection.photo}
          />
          <Card.Body>
            <Col className="d-flex justify-content-between">
              <Card.Title>{collection.name}</Card.Title>
              <Button
                className="btn btn-light"
                onClick={() => handleOpenModal(collection)}
              >
                <FaRegEdit
                  style={{
                    color: "#394867",
                    marginBottom: "12px",
                    fontSize: "18px",
                  }}
                />
              </Button>
            </Col>

            <Card.Subtitle className="mb-2 cool_color">
              {collection.theme}
            </Card.Subtitle>
            <Card.Text>{collection.description}</Card.Text>
            <Col className="d-flex justify-content-between">
              <Button
                className="btn-sm "
                variant="secondary"
                onClick={() => routeChange(collection.id)}
                style={{ backgroundColor: "#FFF7D6 ", color: "#000" }}
              >
                View collection
              </Button>
              <Button className="btn btn-light" onClick={deleteCollection}>
                <FaTrash
                  style={{
                    color: "#394867",

                    fontSize: "14px",
                  }}
                />
              </Button>
            </Col>
            <Card.Text style={{ fontSize: "11px" }}>
              Created : {timeConverter(collection.created_at)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Collection;

export const timeConverter = (time) => {
  if (time === "0000-00-00 00:00:00") return "not available";
  let date = time?.split("T")[0];
  let t = time?.split("T")[1];
  let currentTime = t?.split(".")[0].split(":");
  return `${date} ${currentTime[0]}:${currentTime[1]}`;
};
