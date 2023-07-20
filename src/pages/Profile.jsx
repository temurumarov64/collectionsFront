import NavScroll from "../components/Navbar";
import { Container, Row, Col, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalCollectionComponent from "../components/ModalCollection";
import RingLoader from "react-spinners/RingLoader";
import { useTranslation } from "react-i18next";
import { getCollectionsByUserIdApi } from "../api/collections";
import CollectionComponent from "../components/Collection";

export const defaultValuesForCurrentCollection = {
  name: "",
  theme: "",
  description: "",
  extraFields: [],
};

function Profile() {
  const [show, setShow] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [currentCollection, setCurrentCollection] = useState(
    defaultValuesForCurrentCollection
  );

  const handleClose = () => {
    setShow(false);
    setCurrentCollection(defaultValuesForCurrentCollection);
  };

  const handleShow = (collection) => {
    setCurrentCollection(collection);
    setShow(true);
  };

  async function fetchCollections() {
    const { data } = await getCollectionsByUserIdApi();
    setCollections(data);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    fetchCollections();
  }, []);

  const handleOnChangeFormValue = (key, value) => {
    const newCurrentCollection = { ...currentCollection, [key]: value };
    setCurrentCollection(newCurrentCollection);
  };

  return (
    <>
      <NavScroll />
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <RingLoader
            color={"rgba(163,177,213)"}
            loading={loading}
            size={100}
          />
        </div>
      ) : (
        <Container
          className="mt-4"
          style={{
            width: "80%",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Row>
            <Col>
              <Button
                className="float-end"
                variant="primary"
                onClick={() => handleShow(defaultValuesForCurrentCollection)}
                style={{ backgroundColor: "#C0CDF3 ", color: "#000" }}
              >
                {t("pages.profile1")}
              </Button>

              <p id="text">{t("pages.profile")}</p>

              <div className="tag_form d-flex p-2 bd-highlight justify-content-evenly align-items-center flex-wrap">
                {collections?.length > 0 ? (
                  collections?.map((col, i) => (
                    <CollectionComponent
                      key={i}
                      collection={col}
                      handleShow={handleShow}
                      fetchCollections={fetchCollections}
                    />
                  ))
                ) : (
                  <span id="text">New collections will apear here...</span>
                )}
              </div>

              <ModalCollectionComponent
                show={show}
                setShow={setShow}
                fetchCollections={fetchCollections}
                currentCollection={currentCollection}
                handleClose={handleClose}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Profile;
