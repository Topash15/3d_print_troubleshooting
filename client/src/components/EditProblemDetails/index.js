import { EDIT_PROBLEM } from "../../utils/mutations";
import React, { useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_STEPS } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState";
import CreateStepForm from '../CreateStepForm'

function EditProblemDetails() {
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  console.log(state);
  const { id } = useParams();

  const {
    loading,
    error,
    data: stepsData,
  } = useQuery(QUERY_ALL_STEPS, {
    variables: { category: id },
  });

  const [editForm, setEditForm] = useState({ firstStep: "", nextStep: "" });

  const onChangeEditForm = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const [editProblem] = useMutation(EDIT_PROBLEM);
  const submitFirstStep = async (e) => {
    e.preventDefault();
    const mutationResponse = await editProblem({
      variables: {
        id: id,
        firstStep: editForm.firstStep,
      },
    });
    console.log(mutationResponse);
  };

  const deleteStep = async (e) => {
    e.preventDefault();
    const {id} = e.target
    const mutationResponse = await deleteStep({
      variables: {
        id: id
      }
    })
  }

  //   PAGE WILL NOT LOAD IF PROBLEM DOES NOT HAVE ANY STEPS
  //   REDIRECT TO CREATE PAGE?

  return (
    <div>
      {!stepsData || !stepsData.steps.length ? (
      <div>
        <h3>This problem has no steps. Please create a step.</h3>
        <CreateStepForm/>
        </div>):(
        <div>
          <div className="problem-card">
            <h1>Problem</h1>
            <h3>Problem name :{stepsData.steps[0].category.name}</h3>
            <h3>
              Problem Description :{stepsData.steps[0].category.description}
            </h3>
            {stepsData.steps[0].category.link ? (
              <a href={stepsData.steps[0].category.link} />
            ) : (
              <h3>No Link</h3>
            )}
            {stepsData.steps[0].category.photos ? (
              <img
                src={stepsData.steps[0].category.photos}
                alt={stepsData.steps[0].category.name}
              />
            ) : (
              <h3>No photos</h3>
            )}
            {stepsData.steps[0].category.firstStep ? (
              <h3>{stepsData.steps[0].category.firstStep.step}</h3>
            ) : (
              <form onSubmit={submitFirstStep}>
                <h3>
                  No first step specified. Please select a first step and click
                  confirm.
                </h3>
                <select
                  name="firstStep"
                  onChange={onChangeEditForm}
                  defaultValue=""
                >
                  <option value="">Choose a step</option>
                  {stepsData.steps.map((step) => (
                    <option key={step._id} value={step._id}>
                      {step.step}
                    </option>
                  ))}
                </select>
                <button>Confirm</button>
              </form>
            )}
          </div>
          <h2>Steps</h2>
          <div className="step-card-container">
            {stepsData.steps.map((step) => (
              <div key={step._id} className="step-card">
                <h2>{step.step}</h2>
                <p>{step.description}</p>
                <button className="delete-btn" id={step._id} onClick={deleteStep}>DELETE</button>
                <h2>Responses</h2>
                {step.responses ? (
                  step.responses.map((response) => (
                    <div id={response._id} key={response._id}>
                      <h3>{response.text}</h3>
                      {response.photo ? (
                        <img src={response.photo} alt={response.text} />
                      ) : (
                        <p>No photo</p>
                      )}
                    </div>
                  ))
                ) : (
                  <h4>No responses</h4>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProblemDetails;
