import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { POST } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { loginUrl } from "../../shared/urls";

export default () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const mainHandler = requestHandler();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user,[name]: value});
  }
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await mainHandler(POST,loginUrl,user,null);
    if(res.data.message === "success"){
      sessionStorage.setItem('userToken', res.data.access_token);
      sessionStorage.setItem('user_id', res.data.user_id);
      history.push('/category');
      window.location.reload();
    }
    console.log(res.data);
  }

  return (
    <React.Fragment>
      <Row className="justify-content-md-center mt-3">
        <Col xs lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};
