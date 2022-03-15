import React, { useState, useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { UPDATE_PROBLEMS } from "../../utils/actions";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_STEP,
  CREATE_RESPONSE,
  EDIT_PROBLEM,
  ADD_RESPONSE_TO_STEP,
} from "../../utils/mutations";
import { useParams } from "react-router-dom";

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

  const { id } = useParams();

  // STEP CREATE FUNCTIONS
  // creates state for step form
  const [stepForm, setStepForm] = useState({
    name: "",
    description: "",
    link: "",
    photo: "",
    problem: id,
    responseText: "",
    responsePhoto: "",
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
      const ResponseMutationResponse = await createResponse({
        variables: {
          text: stepForm.responseText,
        },
      });
      const responseId = ResponseMutationResponse.data.addResponse._id;
      const stepMutationResponse = await addResponseToStep({
        variables: {
          id: stepId,
          responses: responseId,
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
    const { name, description, problem, responseText } = stepForm;
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
    if (!responseText){
      errors.push({
        type: "responseText",
        message: "Invalid response text."
      })
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

  // creates function for adding response to database
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const [addResponseToStep] = useMutation(ADD_RESPONSE_TO_STEP);

  return (
    <section className="step-form hidden">
      <form className="form createStep" onSubmit={submitStepHandler}>
        <h1 className="form-title">Step</h1>
        {!id && problemData ? (
          <div>
            <label>To which problem does this step belong?</label>
            <select name="problem" defaultValue="" onChange={handleStepChange}>
              <option value="">Choose a problem</option>
              {problemData.problems.map((problem) => (
                <option key={problem._id} value={problem._id}>
                  {problem.name}
                </option>
              ))}
            </select>
          </div>
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
        <h1 className="form-title">Response</h1>
        <p className="form-side-note">
          Note that the{" "}
          <i>
            <b>Solved</b>
          </i>{" "}
          response is added to each step by default. Only add responses for when
          the step was not successful in solving problem.
        </p>
        <label>Response Text</label>
        <input type="text" name="responseText" onChange={handleStepChange}></input>
        <label>Response Photo Link</label>
        <input type="text" name="responsePhoto" onChange={handleStepChange}></input>
        <button>Submit</button>
      </form>
    </section>
  );
}

export default EntryForm;
