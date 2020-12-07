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
      {/* <Link className="nav-link" to="/home">Home</Link> */}
      {sessionStorage.getItem("userToken") ? (
        <Nav className="mr-auto">
          <Link className="nav-link" to="/survey">
            Mis Encuestas
          </Link>
          <Link className="nav-link" to="/answer">
            Mis Respuestas
          </Link>
          <Link className="nav-link" onClick={logOut}>
            Salir
          </Link>
        </Nav>
      ) : (
        ""
      )}
      {!sessionStorage.getItem("userToken") ? (
        <Nav inline className="mr-auto">
          <Link className="nav-link" to="/login">
            Ingresar
          </Link>
          <Link className="nav-link" to="/register">
            Registrarse
          </Link>
        </Nav>
      ) : (
        ""
      )}
    </Navbar>
  );
};
