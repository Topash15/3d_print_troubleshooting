import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./style.css";

function EntryForm() {
  const [optionFormState, setOptionFormState] = useState({ action: "", component: "" });

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();  
    console.log(optionFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptionFormState({
      ...optionFormState,
      [name]: value,
    });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <h2>What would you like to do?</h2>
        <select name="action" placeholder="action" defaultValue="" onChange={handleChange}>
          <option value="" disabled hidden>
            Choose an action
          </option>
          <option value="create">Create</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
        <select name="component" defaultValue="" onChange={handleChange}>
          <option value="" disabled hidden>
            Choose a target
          </option>
          <option value="problem">Problem</option>
          <option value="step">Steps</option>
          <option value="response">Responses</option>
        </select>
        <button>Submit</button>
      </form>
    </section>
  );
}

export default EntryForm;
