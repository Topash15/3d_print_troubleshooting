import React, { useState, useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS, QUERY_ALL_STEPS } from "../../utils/queries";
import { UPDATE_PROBLEMS } from "../../utils/actions";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_PROBLEM,
  CREATE_STEP,
  CREATE_RESPONSE,
  EDIT_PROBLEM,
} from "../../utils/mutations";

function EntryForm() {
  // calls global state
  const [state, dispatch] = useGlobalContext();

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

  // STEP CREATE FUNCTIONS
  // creates state for step form
  const [stepForm, setStepForm] = useState({
    name: "",
    description: "",
    link: "",
    photo: "",
    problem: "",
    errors: [],
  });

  // creates function for adding step to database
  const [createStep] = useMutation(CREATE_STEP);
  const [editProblem] = useMutation(EDIT_PROBLEM);

  async function submitStepHandler(e) {
    e.preventDefault();
    const valid = await validateStep(stepForm);

    if (!valid) {
      console.log(stepForm.errors);
      return;
    } else {
      const mutationResponse = await createStep({
        variables: {
          step: stepForm.name,
          description: stepForm.description,
          // photos: stepForm.photo,
          links: stepForm.link,
          category: stepForm.problem,
        },
      });
      const stepId = mutationResponse.data.addStep._id;
      console.log(stepId)
      console.log(stepForm.problem)
      const problemMutationResponse = await editProblem({
        id: stepForm.problem,
        steps: stepId,
      })
      console.log(problemMutationResponse);
    }
  }

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepForm({
      ...stepForm,
      [name]: value,
    });
    console.log(stepForm);
  };

  const validateStep = async (stepForm) => {
    const { name, description, problem } = stepForm;
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
    if (!problem) {
      errors.push({
        type: "problem",
        message: "Valid problem is required",
      });
    }

    setStepForm({
      ...stepForm,
      errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  // RESPONSE CREATE FUNCTIONS
  // creates state for response form
  const [responseForm, setResponseForm] = useState({
    text: "",
    photo: "",
    step: "",
    nextStep: "",
    problem: "",
    errors: [],
  });

  // creates function for adding response to database
  const [createResponse] = useMutation(CREATE_RESPONSE);

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
    }
  }

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseForm({
      ...responseForm,
      [name]: value,
    });
    console.log(responseForm);
  };

  const filterSteps = () => {
    let { problem } = responseForm;
    if (problem) {
      return;
    }
  };

  const validateResponse = async (responseForm) => {
    const { name, description } = responseForm;
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

  //   queries db for all Problems
  const { loading, error, data: problemData } = useQuery(QUERY_ALL_PROBLEMS);
  if (loading) {
    console.log("loading");
  } else if (error) {
    console.log(error);
  }

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
      <form className="form createStep" onSubmit={submitStepHandler}>
        <h1>Step</h1>
        <label>To which problem does this step belong?</label>
        {problemData ? (
          <select name="problem" defaultValue="" onChange={handleStepChange}>
            <option value="">Choose a problem</option>
            {problemData.problems.map((problem) => (
              <option key={problem._id} value={problem._id}>
                {problem.name}
              </option>
            ))}
          </select>
        ) : null}
        <label>Title</label>
        <input type="text" name="name" onChange={handleStepChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleStepChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input name="photo" type="text" onChange={handleStepChange}></input>
        <label>Useful URL</label>
        <input name="link" type="text" onChange={handleStepChange}></input>
        <button type="submit"> Submit </button>
      </form>
      <form className="form createResponse">
        <h1>Response</h1>
        <p>
          First you must select which problem and step you the response is for
        </p>
        {problemData ? (
          <select name="problem" onChange={handleResponseChange}>
            {problemData.problems.map((problem) => (
              <option key={problem._id} value={problem._id}>
                {problem.name}
              </option>
            ))}
          </select>
        ) : null}
      </form>
      {/* <h1>Response</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name" type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
        <label>Add another Response?</label>
        if checked, add second response form */}
      <input type="checkbox"></input>
    </section>
  );
}

export default EntryForm;
