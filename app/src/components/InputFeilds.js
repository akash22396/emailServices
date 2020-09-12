import React from "react";

export function InputFeilds(props) {
  return (
    <>
      <label className='font-weight-bold'>{props.labelName}</label>
    </>
  );
}

export function selectBox(props) {
  return (
    <>
      <label className='font-weight-bold'>{props.labelName}</label>
    </>
  );
}

export function InputBox(props) {
  return (
    <>
      <label className='font-weight-bold'>{props.labelName}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeHolder}
        required={props.required}
        className="form-control form-control-md border-radius-0 mb-1"
        onChange={props.handleOnChange}
        readOnly={props.readOnly}
      />
    </>
  );
}
export function TextAreaBox(props) {
  return (
    <>
      <label className='font-weight-bold'>{props.labelName}</label>
      <textarea
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeHolder}
        required={props.required}
        className="form-control form-control-md border-radius-0 mb-1"
        onChange={props.handleOnChange}
        readOnly={props.readOnly}
        cols={props.cols}
        rows={props.rows}
      />
    </>
  );
}
