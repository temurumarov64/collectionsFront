import { Row, Col, Button, Form, Modal } from "react-bootstrap";

import { useState, useEffect } from "react";
import { createCollectionApi, updateCollectionApi } from "../api/collections";
import { Typeahead } from "react-bootstrap-typeahead";
import { defaultValuesForCurrentCollection } from "../pages/Profile";
function ModalCollection({
  show,
  setShow,
  fetchCollections,
  currentCollection,
  handleClose,
}) {
  const [formData, setFormData] = useState(() => currentCollection);
  const [file, setFile] = useState();

  const isCreatedMood = currentCollection.name === "";

  const options = [
    "Books",
    "Coins",
    "Stamps",
    "Postcards",
    "Comics",
    "Action Figures",
    "Trading Cards",
    "Vinyl Records",
    "Movie Memorabilia",
    "Sports Jerseys",
    "Autographs",
    "Art Prints",
    "Antique Furniture",
    "Vintage Clothing",
    "Toy Cars",
    "Dolls",
    "Model Trains",
    "Musical Instruments",
    "Movie Props",
    "Fine China",
    "Wristwatches",
    "Jewelry",
    "Comic Books",
    "Bottles",
    "Sports Memorabilia",
    "Board Games",
    "Vintage Cameras",
    "Sneakers",
    "Figurines",
    "Vinyl Toys",
    "Vintage Posters",
    "Concert Tickets",
    "Vintage Magazines",
    "Musical Records",
    "Action Cameras",
    "Snow Globes",
    "Candles",
    "Shot Glasses",
    "Beer Steins",
    "Vintage Maps",
    "Pocket Knives",
    "Keychains",
    "Trading Pins",
    "Artifacts",
    "Antique Clocks",
    "Hats",
    "Lighters",
    "Fountain Pens",
    "Vintage Telephones",
    "Vinyl Music Albums",
    "Other",
  ];

  const optionTypes = ["text", "textarea", "number", "date"];

  useEffect(() => {
    setFormData(currentCollection);
  }, [currentCollection]);

  const handleOnChangeFormValue = (key, value) => {
    setFormData((formData) => {
      return { ...formData, [key]: value };
    });
  };

  const addFields = () => {
    let newfield = { column_type: "", column_name: "" };

    setFormData({
      ...formData,
      extraFields: [...formData.extraFields, newfield],
    });
  };

  const handleCloseModal = () => {
    setFormData(defaultValuesForCurrentCollection);
    handleClose();
  };

  const collectionEdit = (e) => {
    e.preventDefault();
    handleClose();

    updateCollectionApi(
      currentCollection.id,
      formData.name,
      formData.description,
      formData.theme
    )
      .then((res) => {
        fetchCollections();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const collectionSubmit = (e) => {
    e.preventDefault();
    handleClose();

    // const file = e.currentTarget["fileInput"].files[0];

    const formDataFile = new FormData();
    formDataFile.append("file", file);
    console.log(formDataFile);

    createCollectionApi(
      formData.name,
      formData.description,
      formData.theme,
      formDataFile,
      formData.extraFields
    )
      .then((res) => {
        fetchCollections();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [singleSelections, setSingleSelections] = useState([]);

  const handleFormChange = (index, event) => {
    let extraFields = [...formData.extraFields];
    extraFields[index][event.target.name] = event.target.value;
    setFormData({ ...formData, extraFields });
  };

  const handleFormChangeSelect = (index, value) => {
    let extraFields = [...formData.extraFields];
    extraFields[index]["column_type"] = value;
    setFormData({ ...formData, extraFields });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Form onSubmit={collectionSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Hey, create your own collection :) </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="what do you collect?"
                  value={formData?.name}
                  onChange={(event) =>
                    handleOnChangeFormValue(
                      event.target.name,
                      event.target.value
                    )
                  }
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Theme</Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={(selected) => {
                    handleOnChangeFormValue("theme", selected[0]);
                  }}
                  options={options}
                  placeholder="choose a theme..."
                  selected={[formData.theme || ""]}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={2}
                value={formData?.description}
                placeholder="..."
                onChange={(event) =>
                  handleOnChangeFormValue(event.target.name, event.target.value)
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Choose an image</Form.Label>
                <Form.Control
                  type="file"
                  id="fileInput"
                  name="photo"
                  //   value={formData?.photo}
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  //   onChange={(event) =>
                  //     handleOnChangeFormValue(
                  //       event.target.name,
                  //       event.target.value
                  //     )
                  //   }
                />
              </Form.Group>
            </Row>
            {formData.extraFields &&
              formData.extraFields.length > 0 &&
              formData.extraFields.map((formDataitems, index) => {
                return (
                  <Row className="mb-3" key={index}>
                    <Form.Group as={Col}>
                      <Form.Label>Column name</Form.Label>
                      <Form.Control
                        name="column_name"
                        placeholder="Create a new column for your items"
                        value={formDataitems?.column_name}
                        //   onChange={(event) =>
                        //     handleOnChangeFormValue(
                        //       event.target.name,
                        //       event.target.value
                        //     )
                        //   }
                        onChange={(event) => handleFormChange(index, event)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Select a type</Form.Label>
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="column_type"
                        onChange={(selected) => {
                          handleFormChangeSelect(index, selected[0]);
                        }}
                        options={optionTypes}
                        placeholder="Choose a type..."
                        //   onChange={event => handleFormChange(index, event)}
                      />
                    </Form.Group>
                  </Row>
                );
              })}
            {formData.extraFields && (
              <Button
                id="button"
                className=" my-1 btn-sm"
                variant="outline"
                style={{ backgroundColor: "rgba(163,177,213, 0.2) " }}
                onClick={addFields}
              >
                Add Custom Fields..
              </Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              style={{ backgroundColor: "#FFF7D6 ", color: "#000" }}
            >
              Close
            </Button>
            {isCreatedMood ? (
              <Button
                variant="primary"
                type="submit"
                // onClick={handleClose}
                style={{ backgroundColor: "#C0CDF3 ", color: "#000" }}
              >
                Create
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={collectionEdit}
                style={{ backgroundColor: "#C0CDF3 ", color: "#000" }}
              >
                Edit
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCollection;
