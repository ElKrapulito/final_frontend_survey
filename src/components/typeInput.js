import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const TypeInput = (props) => {
  const SelectItem = (props) => {
    return (
      <Form.Check
        type={props.type}
        id={`default-${props.input.id}`}
        label={props.input.value}
        name={`question-${props.question.id}`}
      />
    );
  };
  switch (props.question.type) {
    case 1:
      return (
        <Form.Group>
          {props.question.inputs.map((input) => (
            <SelectItem
              key={input.id}
              type="checkbox"
              question={props.question}
              input={input}
            />
          ))}
        </Form.Group>
      );
    case 2:
      return (
        <Form.Group>
          {props.question.inputs.map((input) => (
            <SelectItem
              key={input.id}
              type="radio"
              question={props.question}
              input={input}
            />
          ))}
        </Form.Group>
      );
    case 3:
      return (
        <InputGroup className="mb-3">
          <Form.Control placeholder="Insertar respuesta" />
        </InputGroup>
      );
    case 4:
      return (
        <InputGroup className="mb-3">
          <Form.Control as="textarea" />
        </InputGroup>
      );
    case 5:
      return <Form.File id="custom-file" label="Buscar Archivo" />;

    default:
      return "";
  }
};
