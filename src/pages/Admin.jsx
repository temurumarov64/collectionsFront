import NavScroll from "../components/Navbar";
import { Container, Row } from "react-bootstrap";
import TableOfUsersComponent from "../components/TableOfUsers";

function AdminPage() {
  return (
    <>
      <NavScroll />
      <Container className="mt-4">
        <Row>
          <p id="text">This page with all users table</p>
          <TableOfUsersComponent></TableOfUsersComponent>
        </Row>
      </Container>
    </>
  );
}

export default AdminPage;
