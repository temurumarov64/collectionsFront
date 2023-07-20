import NavScroll from "../components/Navbar";
import { useState, useEffect } from "react";
import { getBiggestCollectionsApi } from "../api/collections";
import { Container, Row, Col } from "react-bootstrap";
import CardItemComponent from "../components/Card";
import BiggestCollectionCardComponent from "../components/BiggestCollectionsCard";
import RingLoader from "react-spinners/RingLoader";
import { useTranslation } from "react-i18next";
import { getRecentCollectionItemsApi } from "../api/collectionItems";

function Home() {
  const [biggestCollections, setBiggestCollections] = useState();
  const [recentItems, setRecentItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  async function getRecentItems() {
    const { data } = await getRecentCollectionItemsApi();
    const {
      data: { collectionItems, collections },
    } = await getRecentCollectionItemsApi();
    const users = collections.map((collection) => collection.user);
    const collectionItemsWithUser = collectionItems.map((collectionItem) => {
      const user = users.find(
        (user) => user.id === collectionItem.collection.user_id
      );
      return { ...collectionItem, userName: user.name };
    });
    setRecentItems(collectionItemsWithUser);
    setLoading(false);
  }

  async function getBiggestCollections() {
    const { data: collections } = await getBiggestCollectionsApi();
    const collectionWithItem = collections.map((collection) => {
      return {
        ...collection,
        itemsCount: collection.collectionItems.length,
      };
    });
    const filteredCollection = collectionWithItem
      .sort((a, b) => b.itemsCount - a.itemsCount)
      .slice(0, 6);
    console.log("filteredCollection", filteredCollection);
    setBiggestCollections(filteredCollection);
    console.log(collections);
  }

  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {
    //   ;
    // }, 3500);
    getBiggestCollections();
    getRecentItems();
    // setLoading(false);
  }, []);
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
              <div
                id="text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                  id="text"
                >
                  {t("pages.home")}
                </p>
              </div>
              <div className="tag_form d-flex p-2 bd-highlight justify-content-evenly align-items-center flex-wrap">
                {recentItems?.map((colItem, i) => (
                  <CardItemComponent key={i} colItem={colItem} />
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                id="text"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "28px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                  id="text"
                >
                  {t("pages.home2")}
                </p>
              </div>

              <div className="tag_form d-flex p-2 bd-highlight justify-content-evenly align-items-center flex-wrap">
                {biggestCollections?.map((coll, i) => (
                  <BiggestCollectionCardComponent key={i} coll={coll} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Home;
