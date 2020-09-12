import React, { useState, useEffect } from "react";
import { InputBox, TextAreaBox } from "../components/InputFeilds";
import Axios from "axios";
import { api } from "../api";
function SendEmail(props) {
  const initialState = {
    to: "",
    cc: "",
    subject: "",
    message: "",
  };
  const [values, setValues] = useState(initialState);
  const [progress, setProgress] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const onHandleChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onHandleSubmit = (e) => {
    setProgress(true);
    e.preventDefault();
    let form = {
      data: values,
    };
    Axios.post(api + `/user/sendEmail`, form)
      .then((res) => {
        // console.log(res.data);
        setSendStatus(res.data.message);
          setProgress(false);
        setTimeout(()=>{
          setSendStatus('')
        },5000)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, [props]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5 pt-5">
            <form onSubmit={onHandleSubmit}>
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                  <div className="card border-radius-0 emailCard grayBoxShadow">
                    <div className="card-body ">
                      <div className="py-3">
                        <h1 className="h3">Send Email</h1>
                        <hr />
                      </div>
                      {sendStatus === "" ? (
                        ""
                      ) : sendStatus === "success" ? (
                        <div className="alert alert-success font-weight-bold">
                          Mail Send Successfully.
                        </div>
                      ) : (
                        <div className="alert alert-danger font-weight-bold">
                          Something goes wrong please try again.
                        </div>
                      )}
                      <InputBox
                        labelName={"To"}
                        name={"to"}
                        placeHolder={"Recipients"}
                        value={values.to}
                        type="email"
                        required={"required"}
                        handleOnChange={onHandleChange}
                      />
                     
                      <InputBox
                        labelName={"Subject"}
                        name={"subject"}
                        placeHolder={"Subject"}
                        value={values.subject}
                        type="text"
                        required={"required"}
                        handleOnChange={onHandleChange}
                      />
                      <TextAreaBox
                        labelName={"Message"}
                        name={"message"}
                        value={values.message}
                        type="text"
                        required={"required"}
                        handleOnChange={onHandleChange}
                        rows={8}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary mt-2 border-0 border-radius-0"
                        disabled={progress ? "disabled" : ""}
                      >
                        {progress ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendEmail;
