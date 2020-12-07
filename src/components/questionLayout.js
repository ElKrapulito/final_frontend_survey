import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Form } from "react-bootstrap";
import { Input } from "./inputText";
import "./List.css"

export default (props) => {
  const question = props.question;
  const { inputs } = props.question;
  return (
    <div className="card text-dark mt-3">
      <div className="card-body">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="h5">Pregunta</Form.Label>
          <Form.Control
            parentname={
              question.name ? question.name : `question_${question.id}`
            }
            onChange={props.handleQuestionChanges}
            type="text"
            name="title"
            value={question.title}
            placeholder="Ingresar pregunta"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label className="h5">Tipo de pregunta</Form.Label>
          <Form.Control
            onChange={props.handleQuestionChanges}
            as="select"
            name="type"
            parentname={
              question.name ? question.name : `question_${question.id}`
            }
            value={question.type}
          >
            <option value="0">Seleccionar tipo</option>
            <option value="1">Seleccion unica</option>
            <option value="2">Seleccion multiple</option>
            <option value="3">Repuesta corta</option>
            <option value="4">Respuesta larga</option>
            <option value="5">Subir archivos</option>
          </Form.Control>
        </Form.Group>
        {question.type == "1" || question.type == "2" ? (
          <React.Fragment>
            <Button
              onClick={props.handleAddInput}
              name={question.name}
              className="mb-3"
            >
              Añadir opcion
            </Button>
            <DragDropContext onDragEnd={props.handleOnDragEnd}>
              <Droppable
                droppableId={
                  question.name ? question.name : `question_${question.id}`
                }
              >
                {(provided) => (
                  <ul
                    className="list-group"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {inputs.map((input, index) => {
                      let id = `input_${index}`;
                      return (
                        <Draggable key={index} draggableId={id} index={index} >
                          {(provided) => (
                            <li
                              className="list-group-item item-list"
                              parentname={question.name}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Input
                                onChange={props.handleInputChange}
                                value={input.value}
                                name={
                                  input.name ? input.name : `input_${input.id}`
                                }
                                parentname={
                                  question.name
                                    ? question.name
                                    : `question_${question.id}`
                                }
                              />
                              <Button onClick={() => {props.handleDeleteInput(input)}} className="btn-sm ml-2" variant="danger">
                                X
                              </Button>
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
          </React.Fragment>
        ) : (
          ""
        )}
        <Button
          variant="danger"
          onClick={() => {
            props.handleDeleteQuestion(question);
          }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
