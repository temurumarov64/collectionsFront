import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { getUsersApi } from "../api/users";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { deleteUserApi } from "../api/users";

function TableOfUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => { 
    setCurrentUser(null)
    setShow(false) 
};
  const handleShow = (user) => {
    setCurrentUser(user)
    setShow(true)
};

  const handleOpenModal = (user) => {
    handleShow(user);
  };

  async function fetchUsers() {
    const { data } = await getUsersApi();
    setUsers(data);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    deleteUserApi(id)
      .then((res) => {
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Table
        responsive="md"
        className="table-light  table-hover table-bordered card_item_review"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>user_id</th>
            <th>User name</th>
            <th>Role</th>
            <th>E-mail</th>
            <th>Created at</th>
            <th style={{ width: "20px" }}></th>
            <th style={{ width: "20px" }}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td className="table-data">{user.id}</td>
              <td className="table-data">{user.name}</td>
              <td className="table-data">{user.role}</td>
              <td className="table-data">{user.email}</td>
              <td className="table-data">{timeConverter(user.created_at)}</td>
              <td style={{ textAlign: "center" }} className="table-data">
                <FaUserEdit
                  className="icon"
                  color="#394867"
                  onClick={() => handleOpenModal(user)}
                />
              </td>
              <td style={{ textAlign: "center" }} className="table-data">
                <FaTrash
                  fontSize={14}
                  onClick={() => deleteUser(user.id)}
                  className="icon"
                  color="#394867"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentUser && (
        <Modal show={show} onHide={handleClose} animation={false}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Manage your users and even admins :) </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="what do you collect?"
                    //   onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Theme</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a theme"
                    //   onChange={(event) => setTheme(event.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="..."
                  // onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Choose a picture</Form.Label>
                  <Form.Control type="file" class="hidden" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Choose a picture</Form.Label>
                  <Form.Control type="text" value={currentUser.role} />
                </Form.Group>
              </Row>
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
              {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default TableOfUsers;

export const timeConverter = (time) => {
  if (time === "0000-00-00 00:00:00") return "not available";
  let date = time?.split("T")[0];
  let t = time?.split("T")[1];
  let currentTime = t?.split(".")[0].split(":");
  return `${date} ${currentTime[0]}:${currentTime[1]}`;
};
