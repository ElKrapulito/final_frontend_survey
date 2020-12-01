import React from "react";
import { Col, Row } from "react-bootstrap";
import Question from "../../components/questionLayout"

export default () => {
  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs lg="5">
        <Question/>
        <Question/>
        <Question/>
      </Col>
    </Row>
  );
};
