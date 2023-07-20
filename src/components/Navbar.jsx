import React from "react";
import Form from "react-bootstrap/Form";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { useState } from "react";
import { getItemBySearch } from "../api/collectionItems";

import { FaGlobe, FaUserAlt, FaSearch } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { SwitchTheme } from "./SwitchTheme";
import "../Navbar.css";
import Logo from "../images/Logo2.png";
import { setAuthToken } from "../api/setAuthToken";
import { useTranslation } from "react-i18next";

function NavScroll() {
  const navDropdownTitle = <FaGlobe></FaGlobe>;
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const handleChange = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const logout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setAuthToken();
  };

  const { t, i18n } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  async function fetchItemsBySearch() {
    await getItemBySearch(search);
  }
  const lng = navigator.language;

  const changeLanguageHandler = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar navbar-dark "
        style={{ backgroundColor: "#394867" }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={Logo} width={120} height={40} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0 gap-2 align-items-center">
              {localStorage.getItem("token") ? (
                <Nav.Link href="/profile" className="me-1">
                  <FaUserAlt /> {t("nav.profile")}{" "}
                </Nav.Link>
              ) : (
                <Nav.Link href="/login" className="me-1">
                  <FaUserAlt /> {t("nav.login")}{" "}
                </Nav.Link>
              )}

              <Nav.Link href="/about" className="me-1">
                {t("nav.about")}
              </Nav.Link>

              {localStorage.getItem("role") === "admin" && (
                <Nav.Link href="/admin" className="me-1">
                  Admin{" "}
                </Nav.Link>
              )}
              <SwitchTheme
                checked={theme === "dark"}
                onChange={handleChange}
                className="me-1"
              />
              <NavDropdown
                title={navDropdownTitle}
                id="navbarScrollingDropdown"
                className="me-1"
              >
                <NavDropdown.Item onClick={() => changeLanguageHandler("en")}>
                  English
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => changeLanguageHandler("de")}>
                  Deutsch
                </NavDropdown.Item>
              </NavDropdown>

              <Form className="d-flex">
                <Form.Control
                  name="search"
                  type="text"
                  size="sm"
                  placeholder={t("nav.search")}
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={handleSearch}
                />

                <Button variant="outline-secondary">
                  <FaSearch onClick={fetchItemsBySearch} />
                </Button>

                {localStorage.getItem("token") && (
                  <Nav.Link href="/" onClick={logout} className="me-1">
                    {t("nav.logout")}{" "}
                  </Nav.Link>
                )}
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavScroll;
