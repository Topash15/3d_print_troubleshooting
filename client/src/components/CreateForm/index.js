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
  ADD_RESPONSE_TO_STEP,
} from "../../utils/mutations";

function EntryForm() {
  // calls global state
  const [state, dispatch] = useGlobalContext();

  //   queries db for all Problems
  const { loading, error, data: problemData } = useQuery(QUERY_ALL_PROBLEMS);
  if (loading) {
    console.log("loading");
  } else if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (problemData) {
      dispatch({
        type: UPDATE_PROBLEMS,
        problems: problemData.problems,
      });
    }
  }, [problemData, loading, dispatch]);

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
      const problemMutationResponse = await editProblem({
        variables: {
          id: stepForm.problem,
          steps: stepId,
        },
      });
      window.location.reload();
    }

  }

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepForm({
      ...stepForm,
      [name]: value,
    });
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
    steps: [],
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
          id: responseForm.step,
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

  const filterSteps = () => {
    if (responseForm.problem) {
      let chosenProblem = state.problems.filter(
        (problem) => problem._id === responseForm.problem
      );
      return chosenProblem[0].steps;
    }
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
      <div>{responseForm.problem}</div>
      <form className="form createResponse" onSubmit={submitResponseHandler}>
        <h1>Response</h1>
        <label>
          First you must select which problem and step the response is for
        </label>
        {problemData ? (
          <select name="problem" onChange={handleResponseChange}>
            <option value="">Choose a problem</option>
            {problemData.problems.map((problem) => (
              <option key={problem._id} value={problem._id}>
                {problem.name}
              </option>
            ))}
          </select>
        ) : null}
        {responseForm.problem ? (
          <select name="step" defaultValue="" onChange={handleResponseChange}>
            <option value="">Choose a step</option>
            {filterSteps().map((step) => (
              <option
                key={step._id}
                value={step._id}
                onChange={handleResponseChange}
              >
                {step.step}
              </option>
            ))}
          </select>
        ) : null}
        <label>Name</label>
        <input type="text" name="text" onChange={handleResponseChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleResponseChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input type="text" name="photo" onChange={handleResponseChange}></input>
        <label>Useful URL</label>
        <input type="text" name="link" onChange={handleResponseChange}></input>
        <label>Add another Response?</label>
        {/* if checked, add second response form */}
        <input type="checkbox"></input>
        <button>Submit</button>
      </form>
    </section>
  );
}

export default EntryForm;
