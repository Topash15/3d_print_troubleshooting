import React, { useState } from "react";
import "./style.css";
import { useMutation } from "@apollo/client";
import { CREATE_RESPONSE, ADD_RESPONSE_TO_STEP } from "../../utils/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../utils/GlobalState";

function CreateResponseForm() {
    // call globalstate
    const [state, dispatch] = useGlobalContext();

  // RESPONSE CREATE FUNCTIONS
  // creates state for response form
  const [responseForm, setResponseForm] = useState({
    text: "",
    photo: "",
    step: "",
    nextStep: "",
    errors: [],
  });


  // creates function for adding response to database
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const [addResponseToStep] = useMutation(ADD_RESPONSE_TO_STEP);

  async function submitResponseHandler(e) {
    e.preventDefault();
    const valid = await validateResponse(responseForm);

    if (!valid) {
      console.log(responseForm.errors);
      return;
    } else {
      const mutationResponse = await createResponse({
        variables: {
          text: responseForm.text,
          photo: responseForm.photo,
        },
      });
      const responseId = mutationResponse.data.addResponse._id;
      const stepMutationResponse = await addResponseToStep({
        variables: {
          id: state.currentStep,
          responses: responseId,
        },
      });
    }
    window.location.reload();
  }

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseForm({
      ...responseForm,
      [name]: value,
    });
  };

  const validateResponse = async (responseForm) => {
    const { text } = responseForm;
    const errors = [];

    if (!text) {
      errors.push({ type: "text", message: "Valid text is required" });
    }

    setResponseForm({
      ...responseForm,
      errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="form create-response-form" onSubmit={submitResponseHandler}>
      <h1>Response</h1>
      <label>Name</label>
      <input type="text" name="text" onChange={handleResponseChange}></input>
      <label>Photo Direct Link</label>
      <input type="text" name="photo" onChange={handleResponseChange}></input>
      <button>Submit</button>
    </form>
  );
}

export default CreateResponseForm;
