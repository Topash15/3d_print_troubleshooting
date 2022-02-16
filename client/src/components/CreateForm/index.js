import React, { useState, useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { UPDATE_PROBLEMS } from "../../utils/actions";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PROBLEM } from "../../utils/mutations";

function EntryForm() {
  // calls global state
  const [problemForm, setProblemForm] = useState({
    name: "",
    description: "",
    photo: "",
    errors: [],
  });

  const [createProblem] = useMutation(CREATE_PROBLEM);

  // create problem
  // create step
  // edit problem to set firstStep to submitted step
  // submit responses
  // edit steps to show responses
  async function submitHandler(e) {
    e.preventDefault();
    const valid = await validate(problemForm);

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
        <label>Name</label>
        <input name="name" type="text" onChange={handleChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input name="photo" type="text" onChange={handleChange}></input>
        <button> Submit </button>
      </form>
      {/* <h1>Step</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name" type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
        <h1>Response</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name" type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
        <label>Add another Response?</label>
        {/* if checked, add second response form */}
      <input type="checkbox"></input>
    </section>
  );
}

export default EntryForm;
