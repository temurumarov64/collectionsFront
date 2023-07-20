import NavScroll from "../components/Navbar";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import TableOfItemsComponent from "../components/TableOfItems";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createCollectionItemApi,
  getCollectionsItemsByCollectionApi,
  getAllExtraFieldsByCollectionIdApi,
} from "../api/collections";

function CollectionDetailsPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [collectionItems, setCollectionItems] = useState([]);
  const [collectionExtraFields, setCollectionExtraFields] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({ name: "" });

  async function fetchCollectionItems(id) {
    const { data } = await getCollectionsItemsByCollectionApi(id);
    setCollectionItems(data);
  }

  async function fetchCollectionExtraFields(id) {
    const { data } = await getAllExtraFieldsByCollectionIdApi(id);
    setCollectionExtraFields(data);
  }

  useEffect(() => {
    fetchCollectionItems(id);
    fetchCollectionExtraFields(id);
  }, []);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const collectionItemSubmit = (e) => {
    e.preventDefault();
    handleClose();

    createCollectionItemApi(formData, id)
      .then((res) => {
        fetchCollectionItems(id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <NavScroll />
      <Container className="mt-4">
        <Row>
          <Col>
            <Button
              className="float-end"
              variant="primary"
              onClick={handleShow}
              style={{ backgroundColor: "#C0CDF3 ", color: "#000" }}
            >
              Add item
            </Button>
            <p id="text">This page with table of collection items</p>
            <TableOfItemsComponent
              collectionItems={collectionItems}
              collectionId={id}
              fetchCollectionItems={() => fetchCollectionItems(id)}
            />{" "}
            <Modal show={show} onHide={handleClose} animation={false}>
              <Form onSubmit={collectionItemSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Hey, create your own collection item :){" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="name"
                        type="name"
                        value={formData.name}
                        placeholder="what is your collection item?"
                        onChange={handleFormData}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col}>
                    <Row className="mb-3">
                      {collectionExtraFields.map(
                        (collectionExtraField, key) => (
                          <>
                            <Form.Label>{collectionExtraField.name}</Form.Label>
                            <Form.Control
                              name={collectionExtraField.id}
                              value={formData[collectionExtraField.id]}
                              type={collectionExtraField.type}
                              onChange={handleFormData}
                            />
                          </>
                        )
                      )}
                    </Row>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{ backgroundColor: "#FFF7D6 ", color: "#000" }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    // onClick={handleClose}
                    style={{ backgroundColor: "#C0CDF3 ", color: "#000" }}
                  >
                    Create
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CollectionDetailsPage;
