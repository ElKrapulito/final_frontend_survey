import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { TypeInput } from "../../components/typeInput";
import { DELETE, EDIT, POST, PUT } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { surveyUrl, answerUrl } from "../../shared/urls";

export default (props) => {
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
  const [answer, setAnswer] = useState({
    survey_id: "0",
    user_id: sessionStorage.getItem("user_id"),
    answer_questions: [],
  });
  let mainHandler = requestHandler();
  let history = useHistory();
  let { id } = useParams();
  const fetchSurvey = async () => {
    let res = await mainHandler(EDIT, surveyUrl, null, id);
    if (res.data.message == "success") {
      let questions = res.data.survey.questions;
      questions.forEach((question) => {
        question.inputs.forEach((input) => {
          input.checked = false;
        });
      });
      setAnswer({ ...answer, survey_id: id });
      setSurvey(res.data.survey);
    }
  };

  const fetchAnswer = async () => {
    let res = await mainHandler(EDIT, answerUrl, null, id);
    let resSurvey = await mainHandler(
      EDIT,
      surveyUrl,
      null,
      res.data.answer.survey_id
    );
    console.log(res.data);
    setAnswer(res.data.answer);
    setSurvey(resSurvey.data.survey);
  };

  const submitAnswer = async () => {
    let res;
    if (props.location.pathname.includes("edit")) {
      res = await mainHandler(PUT, answerUrl, answer, answer.id);
    } else {
      res = await mainHandler(POST, answerUrl, answer, null);
    }
    if (res.data.message == "success") {
      history.push("/answer");
    } else {
      alert("error submiting answer");
    }
  };

  const handleDelete = async () => {
    let res = await mainHandler(DELETE, answerUrl, null, id);
    if (res.data.message == "success") {
      history.push("/answer");
    } else {
      alert("error deleting answer");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let arrAnswers = answer.answer_questions;
    if (arrAnswers.find((obj) => obj.question_id == name)) {
      let i = arrAnswers.findIndex((obj) => obj.question_id == name);
      let inputs = arrAnswers[i].inputs;
      let index = survey.questions.findIndex((obj) => obj.id == name);
      if (survey.questions[index].type != 1) {
        if (inputs.find((obj) => obj.id == value)) {
          inputs = inputs.filter((obj) => obj.id != value);
        } else {
          inputs = [...inputs, { id: value }];
        }
      } else {
        inputs = [{ id: value }];
      }
      arrAnswers[i].inputs = inputs;
    } else {
      arrAnswers = [
        ...arrAnswers,
        {
          question_id: name,
          inputs: [
            {
              id: value,
            },
          ],
        },
      ];
    }
    setAnswer({
      ...answer,
      answer_questions: arrAnswers,
    });
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    let answers = answer.answer_questions;
    if (answers.find((obj) => obj.question_id == name)) {
      let i = answers.findIndex((obj) => obj.question_id == name);
      answers[i].values[0] = { ...answers[i].values[0], value };
    } else {
      answers = [
        ...answers,
        {
          question_id: name,
          values: [{ value: value }],
        },
      ];
    }
    setAnswer({ ...answer, answer_questions: answers });
  };

  useEffect(() => {
    if (props.location.pathname.includes("edit")) {
      fetchAnswer();
    } else {
      fetchSurvey();
    }
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
        {survey.questions.map((question) => {
          let i = answer.answer_questions.findIndex(
            (obj) => obj.question_id == question.id
          );
          let arr = answer.answer_questions[i];
          return (
            <Card key={question.id} className="text-dark mt-3">
              <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <TypeInput
                  handleInputChange={handleInputChange}
                  handleValueChange={handleValueChange}
                  inputChecked={arr}
                  question={question}
                />
              </Card.Body>
            </Card>
          );
        })}
        <Button className="mt-3 mr-3" onClick={submitAnswer}>
          Guardar
        </Button>
        {props.location.pathname.includes("edit") ? (
          <Button variant="danger" className="mt-3 mr-3" onClick={handleDelete}>
            Eliminar
          </Button>
        ) : (
          ""
        )}
        <Button
          variant="secondary"
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
