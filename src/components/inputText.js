import React from "react";

export const Input = (props) => {
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
