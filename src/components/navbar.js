import React, { useState } from "react";
import {  Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();
  const [session, setSession] = useState();
  const logOut = () => {
    sessionStorage.clear();
    history.push("login");
    window.location.reload();
  };
  return (
    <Navbar bg="dark" className="border border-white" variant="dark">
      <Link className="nav-link" to="/home">Home</Link>
      {sessionStorage.getItem("userToken") ? (
        <Nav className="mr-auto">
          <Link className="nav-link" to="/category">
            Category
          </Link>
          <Link className="nav-link" to="/gif">
            Gif
          </Link>
          <Link className="nav-link" onClick={logOut}>
            Log out
          </Link>
        </Nav>
      ) : (
        ""
      )}
      {!sessionStorage.getItem("userToken") ? (
        <Nav inline className="mr-auto">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </Nav>
      ) : (
        ""
      )}

      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
};
