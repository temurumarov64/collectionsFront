import NavScroll from "../components/Navbar";
import { Container, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api/authorization";
import RingLoader from "react-spinners/RingLoader";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValidation = (event) => {
    let formIsValid = true;

    if (name === "") {
      formIsValid = false;
      setNameError("Name is Not Valid");
      return false;
    } else {
      setNameError("");
      formIsValid = true;
    }

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email is Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z0-9]{6,40}$/)) {
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

  const signupSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      signUpApi(name, email, password)
        .then((res) => {
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
          if (e === 409) {
            setMessage("User with such an e-mail already exists");
            return;
          }
        });
    } else {
      setpasswordError(
        "Signup error: name can't be empy, password must contain only letters and numbers and be at least 6 up to 40 characters long"
      );
    }
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
        <Container className="mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form id="loginform" onSubmit={signupSubmit}>
                <h4 className="form-group m-3" id="text">
                  Create a Sammel account
                </h4>
                <div className="form-group m-3">
                  <label id="text">Name</label>
                  <input
                    type="name"
                    className="form-control"
                    id="NameInput"
                    name="NameInput"
                    aria-describedby="nameHelp"
                    placeholder="Your name(e.g.'Hire Me Pleasovich')"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <small id="emailHelp" className="text-danger form-text">
                    {nameError}
                  </small>
                </div>
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
                    placeholder="6+ characters"
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
                  Create Account
                </Button>
              </form>
              <Button
                id="button"
                className="ms-3 my-1 btn-sm"
                variant="outline"
                onClick={() => navigate("/login")}
                style={{ backgroundColor: "rgba(163,177,213, 0.2) " }}
              >
                {" "}
                Already have an account? Sign in
              </Button>
              <div className="error ms-3 my-1">{message}</div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Signup;
