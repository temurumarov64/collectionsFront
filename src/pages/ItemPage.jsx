import NavScroll from "../components/Navbar";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCollectionItemByIdApi } from "../api/collections";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {
  createCommentApi,
  getCommentsByCollectionItemApi,
} from "../api/collectionItems";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Item() {
  const { id, collectionId } = useParams();
  const [collectionItemDetails, setCollectionItemDetails] = useState({});
  const [comment, setComment] = useState("");
  const [fetchComments, setFetchComments] = useState([]);

  useEffect(() => {
    getItemDetails();
    fetchCommentsByItem();
  }, []);

  async function getItemDetails() {
    const { data } = await getCollectionItemByIdApi(id, collectionId);
    const {
      collectionItemsExtraFieldsValues,
      extraFieldsCollectionItems,
      name,
    } = data;
    let newCollectionItemDetail = {
      name,
    };
    collectionItemsExtraFieldsValues.forEach((extraField) => {
      const foundedExtraField = extraFieldsCollectionItems.find(
        (extraFieldsCollectionItem) =>
          extraFieldsCollectionItem.id ===
          extraField.extraFieldsCollectionItems_id
      );
      newCollectionItemDetail[foundedExtraField.name] = extraField.value;
    });
    setCollectionItemDetails(newCollectionItemDetail);
  }

  async function fetchCommentsByItem() {
    const { data } = await getCommentsByCollectionItemApi(id);
    setFetchComments(data);
    console.log(data);
  }

  const onHandleCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  useEffect(() => {
    console.log(Object.entries(collectionItemDetails));
  }, [collectionItemDetails]);

  const createComment = (e) => {
    e.preventDefault();
    const collectionItem = id;
    createCommentApi(comment, collectionItem)
      .then((res) => {
        fetchCommentsByItem();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <NavScroll />
      <Container
        className="mt-4"
        style={{
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Row>
          <div id="text" className="card_item_review">
            <h4>Details about item</h4>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "28px",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              <p>
                {Object.entries(collectionItemDetails).map(
                  ([key, value], index) => (
                    <div key={index}>
                      {key}: {value}
                    </div>
                  )
                )}
                <p>
                  <p></p>
                  <Form>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Your comment
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="..."
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={comment}
                        onChange={onHandleCommentChange}
                      />
                    </InputGroup>
                    <Button
                      type="submit"
                      variant="outline"
                      style={{ backgroundColor: "#C0CDF3 " }}
                      onClick={createComment}
                    >
                      Create comment
                    </Button>
                  </Form>
                </p>
              </p>
            </p>
          </div>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <div id="text" className="card_item_review">
            <h5>Comments</h5>
            {fetchComments?.length > 0 ? (
              fetchComments?.map((comment, i) => (
                <Card key={i} style={{ marginTop: "20px" }}>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p> {comment.text}. </p>
                      <footer className="blockquote-footer">
                        {" "}
                        <cite title="Source Title">{comment.user.name}</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <span id="text">New comments will apear here...</span>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Item;
