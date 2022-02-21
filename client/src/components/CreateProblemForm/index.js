import React, { useState } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { useMutation } from "@apollo/client";
import { CREATE_PROBLEM } from "../../utils/mutations";
import {useNavigate} from 'react-router-dom'


function CreateProblemForm() {
  // calls global state
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();

  // PROBLEM CREATE FUNCTIONS
  // creates state for problem form
  const [problemForm, setProblemForm] = useState({
    name: "",
    description: "",
    photo: "",
    errors: [],
  });

  const [createProblem] = useMutation(CREATE_PROBLEM);

  async function submitHandler(e) {
    e.preventDefault();
    const valid = await validate(problemForm);

    // returns errors and does not create new problem
    if (!valid) {
      console.log(problemForm.errors);
      return;
    } else {
      const mutationResponse = await createProblem({
        variables: {
          name: problemForm.name,
          description: problemForm.description,
          photos: problemForm.photo,
        },
      });
      window.location.reload()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemForm({
      ...problemForm,
      [name]: value,
    });
    console.log(problemForm);
  };

  //used to ensure valid inputs are submitted before creating new problem
  const validate = async (problemForm) => {
    const { name, description } = problemForm;
    const errors = [];

    if (!name) {
      errors.push({ type: "name", message: "Valid name is required" });
    }
    if (!description) {
      errors.push({
        type: "description",
        message: "Valid description is required",
      });
    }

    setProblemForm({
      ...problemForm,
      errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section>
      <form className="form createProblem" onSubmit={submitHandler}>
        <h1>Problem</h1>
        <label>Title</label>
        <input name="name" type="text" onChange={handleChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input name="photo" type="text" onChange={handleChange}></input>
        <button type="submit"> Submit </button>
      </form>
    </section>
  );
}

export default CreateProblemForm;
