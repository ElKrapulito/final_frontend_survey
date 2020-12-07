import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const TypeInput = (props) => {
  const SelectItem = (props) => {
    return (
      <Form.Check
        type={props.type}
        id={props.input.id}
        label={props.input.value}
        name={props.question.id}
        value={props.input.id}
        checked={props.inputChecked}
        onChange={props.handleInputChange}
      />
    );
  };
  switch (props.question.type) {
    case 1:
      return (
        <Form.Group>
          {props.question.inputs.map((input) => {
            let arr = props.inputChecked;
            let bool = false;
            if (arr){
              bool = arr.inputs.find(obj => obj.id == input.id)? true: false
            }
            return(
            <SelectItem
              key={input.id}
              type="radio"
              question={props.question}
              input={input}
              handleInputChange={props.handleInputChange}
              inputChecked={bool}
            />
          )})}
        </Form.Group>
      );
    case 2:
      return (
        <Form.Group>
          {props.question.inputs.map((input) => {
            let arr = props.inputChecked;
            let bool = false;
            if (arr){
              bool = arr.inputs.find(obj => obj.id == input.id)? true: false
            }
            return(
            <SelectItem
              key={input.id}
              type="checkbox"
              question={props.question}
              input={input}
              handleInputChange={props.handleInputChange}
              inputChecked={bool}
            />
          )})}
        </Form.Group>
      );
    case 3:
      return (
        <InputGroup className="mb-3">
          <Form.Control onChange={props.handleValueChange} value={props.inputChecked? props.inputChecked.values[0].value : ''} name={props.question.id} placeholder="Insertar respuesta" />
        </InputGroup>
      );
    case 4:
      return (
        <InputGroup className="mb-3">
          <Form.Control onChange={props.handleValueChange} value={props.inputChecked? props.inputChecked.values[0].value : ''} name={props.question.id} as="textarea" />
        </InputGroup>
      );
    case 5:
      return <Form.File id="custom-file" label="Buscar Archivo" />;

    default:
      return "";
  }
};
