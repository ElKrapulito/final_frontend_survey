import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { POST } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { registerUrl } from "../../shared/urls";

export default () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const mainHandler = requestHandler();
  let history = useHistory();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await mainHandler(POST, registerUrl, user, null);
    if(res.data.message === "success"){
      history.push('/login');
    }
  }

  return (
      <Row className="justify-content-md-center mt-3">
        <Col xs lg="4">
          <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={handleChange} type="text" name="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleChange} type="email" name="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChange} type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
  );
};
