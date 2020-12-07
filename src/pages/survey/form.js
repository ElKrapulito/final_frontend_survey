import moment from "moment";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Question from "../../components/questionLayout";
import { DELETE, EDIT, POST, PUT } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { questionUrl, surveyUrl, inputUrl } from "../../shared/urls";

export default () => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    begin_date: "",
    end_date: "",
    auth: "0",
    state: "0",
    count: "0",
    user_id: sessionStorage.getItem('user_id'),
    questions: [],
  });
  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [
        ...survey.questions,
        {
          name: `question_${survey.questions.length}`,
          element: Question,
          position: survey.questions.length,
          title: "",
          type: "0",
          inputs: [],
        },
      ],
    });
  };
  const Input = (props) => {
    return (
      <div className="input-group mb-3">
        <input
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          type="text"
          className="form-control"
          parentname={props.parentname}
        />
      </div>
    );
  };

  const addInput = (e) => {
    const { name } = e.target;
    const questionIndex = survey.questions.findIndex(
      (question) => question.name === name
    );
    let arr = [...survey.questions];
    let question = arr[questionIndex];
    question.inputs = [
      ...question.inputs,
      {
        element: Input,
        position: question.inputs.length,
        name: `input_${question.inputs.length}`,
        value: "",
        text: "Hello!",
      },
    ];
    setSurvey({ ...survey, questions: arr });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parentname = e.currentTarget.getAttribute("parentname");
    const i = survey.questions.findIndex(
      (question) =>
        question.name === parentname || `question_${question.id}` === parentname
    );
    let arr = survey.questions[i].inputs;
    let index = arr.findIndex(
      (obj) => obj.name === name || `input_${obj.id}` === name
    );
    arr[index].value = value;
    setSurvey({ ...survey, arr });
  };

  const handleQuestionChanges = (e) => {
    const { name, value } = e.target;
    let parentname = e.currentTarget.getAttribute("parentname");
    let arr = survey.questions;
    const i = survey.questions.findIndex(
      (question) =>
        question.name === parentname || `question_${question.id}` === parentname
    );
    arr[i] = { ...arr[i], [name]: value };
    setSurvey({ ...survey, questions: arr });
  };

  const handleOnDragEnd = (res) => {
    if (!res.destination) return;
    let parentname = res.source.droppableId;
    const i = survey.questions.findIndex(
      (question) =>
        question.name === parentname || `question_${question.id}` === parentname
    );
    let arr = survey.questions;
    const items = Array.from(arr[i].inputs);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);
    items.forEach((item, index) => {
      item.position = index;
    });
    arr[i].inputs = items;
    setSurvey({ ...survey, questions: arr });
  };

  const handleOnDragEndQuestions = (res) => {
    if (!res.destination) return;
    const items = Array.from(survey.questions);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);
    items.forEach((item, index) => {
      item.position = index;
    });
    setSurvey({ ...survey, questions: items });
  };

  const handleChangeSurvey = (e) => {
    const { name, value } = e.target;
    if (name === "auth" || name === "state") {
      setSurvey({ ...survey, [name]: e.target.checked ? "1" : "0" });
    } else {
      setSurvey({ ...survey, [name]: value });
    }
  };

  let mainHandler = requestHandler();
  let { id } = useParams();
  let history = useHistory();

  const fetchSurvey = async () => {
    let res = await mainHandler(EDIT, surveyUrl, null, id);
    let data = res.data.survey;
    setSurvey(data);
  };

  const handleSubmit = async () => {
    let res;
    if (!id) {
      res = await mainHandler(POST, surveyUrl, survey, null);
    } else {
      res = await mainHandler(PUT, surveyUrl, survey, id);
    }
    if (res.data.message === "success") {
      history.push("/survey");
    } else {
      alert("error!");
    }
  };

  const handleDeleteQuestion = async (question) => {
    let res = await mainHandler(DELETE, questionUrl, null, question.id);
    if (res.data.message == "success") {
      let arr = survey.questions;
      arr = arr.filter(
        (obj) => obj.id !== question.id || obj.name !== question.name
      );
      setSurvey({ ...survey, questions: arr });
    }
  };

  const handleDeleteInput = async (input) => {
    let res = await mainHandler(DELETE,inputUrl, null, input.id);
    if (res.data.message == "success") {
      let arr = survey.questions;
      let i = arr.findIndex((obj) => obj.id === input.question_id);
      arr[i].inputs = arr[i].inputs.filter((obj) => obj.id !== input.id);

      setSurvey({ ...survey, questions: arr });
    }
  };

  useEffect(() => {
    if (id) {
      fetchSurvey();
    }
  }, []);

  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs lg="5">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="h5">Titulo</Form.Label>
          <Form.Control
            onChange={handleChangeSurvey}
            type="text"
            name="title"
            value={survey.title}
            placeholder="Ingresar pregunta"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChangeSurvey}
            name="description"
            value={survey.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha de inicio</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChangeSurvey}
            name="begin_date"
            value={moment(survey.begin_date).format("YYYY-MM-DD")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha final</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChangeSurvey}
            name="end_date"
            value={moment(survey.end_date).format("YYYY-MM-DD")}
          />
        </Form.Group>
        <Form.Group controlId="authCheckbox">
          <Form.Label>Encuesta requiere de inicio de sesion</Form.Label>
          <Form.Check
            type="checkbox"
            onChange={handleChangeSurvey}
            name="auth"
            label="Autenticado"
            checked={survey.auth == 1 ? true : false}
          />
        </Form.Group>
        <Form.Group controlId="stateCheckBox">
          <Form.Label>Estado de la encuesta</Form.Label>
          <Form.Check
            type="checkbox"
            onChange={handleChangeSurvey}
            name="state"
            label="Abierto"
            checked={survey.state == 1 ? true : false}
          />
        </Form.Group>
        <Button onClick={addQuestion} className="mb-3">
          Añadir pregunta
        </Button>
        <DragDropContext onDragEnd={handleOnDragEndQuestions}>
          <Droppable droppableId="questions">
            {(provided) => (
              <ul
                className="list-group"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {survey.questions.map((question, index) => {
                  let id = `question_${index}`;
                  return (
                    <Draggable key={index} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className="list-group-item mb-3"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Question
                            key={question.name}
                            handleAddInput={addInput}
                            handleInputChange={handleInputChange}
                            handleQuestionChanges={handleQuestionChanges}
                            handleOnDragEnd={handleOnDragEnd}
                            handleDeleteQuestion={handleDeleteQuestion}
                            handleDeleteInput={handleDeleteInput}
                            question={question}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <Button className="mr-3" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </Button>
      </Col>
    </Row>
  );
};
