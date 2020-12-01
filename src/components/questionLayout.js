import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Form } from "react-bootstrap";

export default () => {
  const [question, setQuestion] = useState({
    title: "",
    type: "0",
  });
  const [inputs, setInput] = useState([]);
  const Input = (props) => {
    return (
      <div className="input-group mb-3">
        <input
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          type="text"
          className="form-control"
        />
      </div>
    );
  };

  const addInput = () => {
    setInput([
      ...inputs,
      {
        element: Input,
        position: inputs.length,
        name: `input_${inputs.length}`,
        value: "",
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let arr = [...inputs];
    let index = arr.findIndex((obj) => obj.name === name);
    arr[index].value = value;
    setInput(arr);
  };

  const handleOnDragEnd = (res) => {
    if (!res.destination) return;
    const items = Array.from(inputs);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);
    items.forEach((item, index) => {
      item.position = index;
    });
    setInput(items);
  };

  const handleQuestionChanges = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  return (
    <div className="card text-dark mt-3">
      <div className="card-body">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="h5">Pregunta</Form.Label>
          <Form.Control onChange={handleQuestionChanges} type="text" name="title" value={question.title} placeholder="Ingresar pregunta" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label className="h5">Tipo de pregunta</Form.Label>
          <Form.Control
            onChange={handleQuestionChanges}
            as="select"
            name="type"
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
            <Button onClick={addInput} className="mb-3">
              Añadir opcion
            </Button>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="inputs">
                {(provided) => (
                  <ul
                    className="list-group"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {inputs.map((Input, index) => {
                      let id = `input_${index}`;
                      return (
                        <Draggable key={index} draggableId={id} index={index}>
                          {(provided) => (
                            <li
                              className="list-group-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Input.element
                                onChange={handleInputChange}
                                value={Input.value}
                                name={id}
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
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
