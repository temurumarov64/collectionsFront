import NavScroll from "../components/Navbar";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authorization";
import { setAuthToken } from "../api/setAuthToken";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [isLoggedin, setIsLoggedin] = useState("false");
  const [message, setMessage] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z0-9]{6,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Length must be at least 6 characters and up to 40 characters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      loginApi(email, password)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user_id", res.data.user_id);
          setIsLoggedin(true);
          setAuthToken(res.token);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          if (e === 401) {
            setMessage("Invalid credentials");
            return;
          }
        });
    } else {
      setpasswordError("Login error");
    }
  };

  return (
    <>
      <NavScroll />
      <Container className="mt-5">
        <Row>
          <Col className="col-lg-4">
            <Image
              src="https://images.unsplash.com/photo-1560427450-00fa9481f01e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=393&q=80"
              fluid
            />
            <p id="text">
              Photo by{" "}
              <a href="https://unsplash.com/@waldemarbrandt67w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Waldemar Brandt
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </p>
          </Col>
          <Col className="col-lg-6">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <form id="loginform" onSubmit={loginSubmit} className="mt-5">
                  <h4 className="form-group m-3" id="text">
                    Login to manage your account
                  </h4>
                  <div className="form-group m-3">
                    <label id="text">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="EmailInput"
                      name="EmailInput"
                      aria-describedby="emailHelp"
                      placeholder="hireme@itransition.com"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {emailError}
                    </small>
                  </div>
                  <div className="form-group m-3">
                    <label id="text">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="at least 6 characters"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>
                  <Button
                    className="ms-3 "
                    type="submit"
                    variant="outline"
                    style={{ backgroundColor: "#C0CDF3 " }}
                  >
                    Sign In
                  </Button>
                </form>
                <Button
                  id="button"
                  className="ms-3 my-1 btn-sm"
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  style={{ backgroundColor: "rgba(163,177,213, 0.2) " }}
                >
                  {" "}
                  Don't have an account? Sign up
                </Button>
                <div className="error ms-3 my-1">{message}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
