import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { EDIT } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { surveyUrl } from "../../shared/urls";
import { TypeInput } from "../../components/typeInput";

export default () => {
  const [survey, setSurvey] = useState({
    id: "0",
    title: "",
    description: "",
    begin_date: "",
    end_date: "",
    auth: "",
    count: "",
    state: "",
    user_id: "",
    questions: [],
  });
  let mainHandler = requestHandler();
  let history = useHistory();
  let { id } = useParams();
  const fetchSurvey = async () => {
    let res = await mainHandler(EDIT, surveyUrl, null, id);
    setSurvey(res.data.survey);
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs lg="5">
        <Card className="text-dark mt-3">
          <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            <Card.Text>{survey.description}</Card.Text>
          </Card.Body>
        </Card>
        {survey.questions.map((question) => (
          <Card key={question.id} className="text-dark mt-3">
            <Card.Body>
              <Card.Title>{question.title}</Card.Title>
              <TypeInput question={question} />
            </Card.Body>
          </Card>
        ))}
        <Button
          variant="danger"
          className="mt-3"
          onClick={() => {
            history.goBack();
          }}
        >
          Cancelar
        </Button>
      </Col>
    </Row>
  );
};
