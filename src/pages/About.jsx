import NavScroll from "../components/Navbar";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function About() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <NavScroll />
      <Container
        className="mt-4"
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Row>
          <div id="text" className="card_item_review">
            <h4>{t("pages.about1")}</h4>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "28px",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {t("pages.about2")}

              <p>
                <p></p> {t("pages.about")}{" "}
                <p>
                  <p></p>Sincerely, Temur Umarov
                </p>
              </p>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default About;
