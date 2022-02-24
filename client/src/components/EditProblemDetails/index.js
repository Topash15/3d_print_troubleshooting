import {
  EDIT_PROBLEM,
  DELETE_PROBLEM,
  DELETE_STEP,
  EDIT_RESPONSE,
  DELETE_RESPONSE,
  REMOVE_RESPONSE_FROM_STEP,
} from "../../utils/mutations";
import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_STEPS } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState";
import CreateStepForm from "../CreateStepForm";
import plus from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";
import { UPDATE_CURRENT_STEP } from "../../utils/actions";

import CreateResponseForm from "../CreateResponseForm";

function EditStepDetails() {
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  console.log(state);
  const { id } = useParams();

  const navigate = useNavigate();

  // // allows refreshing component
  // // NOT CURRENTLY IN USE
  // const [refresh, setRefresh] = useState({})
  // const handleRefresh = () => {
  //   setRefresh({});
  // }

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
    console.log(editForm);
  };

  // used to submit the first step if none are specified
  const [editProblem] = useMutation(EDIT_PROBLEM);
  const submitFirstStep = async (e) => {
    e.preventDefault();
    const mutationResponse = await editProblem({
      variables: {
        id: id,
        firstStep: editForm.firstStep,
      },
    });
  };

  const editProblemBtn = async (e) => {};
  const [deleteProblem] = useMutation(DELETE_PROBLEM);
  const deleteProblemBtn = async (e) => {
    const mutationResponse = await deleteProblem({
      variables: { id: id },
    });
    window.location.assign("/mod-entry/");
  };

  // used to delete step
  // will also delete firstStep from problem if deleted step is the first step
  const [deleteStep] = useMutation(DELETE_STEP);
  const deleteStepBtn = async (e) => {
    const stepId = e.target.dataset.id;
    const mutationResponse = await deleteStep({
      variables: {
        id: stepId,
      },
    });
    // changes problems first step to null if step being deleted is the first step
    if (stepId === stepsData.steps[0].category.firstStep._id) {
      const problemMutationResponse = await editProblem({
        variables: {
          id: id,
          firstStep: null,
        },
      });
    }
    window.location.reload();
  };

  // used to open edit step
  const editStepBtn = async (e) => {
    const { id } = e.target.parentElement;
    const mutationResponse = await deleteStep({
      variables: {
        id: id,
      },
    });
  };

  // used to determine if step create form should open
  const [stepIsOpen, setStepIsOpen] = useState({ createStep: false });
  const createStep = (e) => {
    setStepIsOpen({
      createStep: true,
    });
    console.log(stepIsOpen);
  };

  // used to match first step id with step object from stepsData.steps array
  const findFirstStep = () => {
    if (stepsData.steps[0].category.firstStep._id) {
      return stepsData.steps.find(
        (step) => step._id === stepsData.steps[0].category.firstStep._id
      );
    }
  };

  // returns all but one step
  const filterSteps = (id) => {
    return stepsData.steps.filter((step) => step._id !== id);
  };

  const [responseIsOpen, setResponseIsOpen] = useState({
    createResponse: false,
  });

  // create new response
  const createResponse = (e) => {
    const stepId = e.target.dataset.id;
    setResponseIsOpen({
      createResponse: true,
    });
    console.log(responseIsOpen);
    dispatch({
      type: UPDATE_CURRENT_STEP,
      currentStep: stepId,
    });
  };


  const [editResponse] = useMutation(EDIT_RESPONSE);  
  const submitNextStep = async (e) => {
    e.preventDefault();
    const responseId = e.target.dataset.id;
    const mutationResponse = await editResponse({
      variables: {
        id: responseId,
        nextStep: editForm.nextStep,
      },
    });
  };

  // const [deleteResponse] = useMutation(DELETE_RESPONSE)

  // // delete response
  // const deleteResponseBtn = async (e) => {
  //   const {id} = e.target.dataset
  //   const mutationResponse = await deleteResponse({
  //     variables: {
  //       id:
  //     }
  //   })
  // }

  return (
    <div>
      {!stepsData || !stepsData.steps.length || stepIsOpen.createStep ? (
        <div className="create-step-container">
          {!stepIsOpen.createStep ? (
            <h3>This problem has no steps. Please create a step.</h3>
          ) : (
            <h3>Create a Step</h3>
          )}
          <CreateStepForm />
        </div>
      ) : (
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
              <h3>No photo</h3>
            )}
            {stepsData.steps[0].category.firstStep ? (
              <div>
                <button className="edit-btn" onClick={editProblemBtn}>
                  EDIT
                </button>
                <button className="delete-btn" onClick={deleteProblemBtn}>
                  DELETE
                </button>
                <h2>First Step</h2>
                <h3>{findFirstStep().step}</h3>
              </div>
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
            <div className="step-card" id="add-step" onClick={createStep}>
              <h2 className="step-card-title">Add a step</h2>
              <img className="step-card-image" src={plus} alt="add Step" />
            </div>
            {stepsData.steps.map((step) => (
              <div key={step._id} className="step-card">
                <h2>{step.step}</h2>
                <p>{step.description}</p>
                <div>
                  <button
                    data-id={step._id}
                    className="edit-btn"
                    onClick={editStepBtn}
                  >
                    EDIT
                  </button>
                  <button
                    data-id={step._id}
                    className="delete-btn"
                    onClick={deleteStepBtn}
                  >
                    DELETE
                  </button>
                </div>
                <h2>Responses</h2>
                <ol className="response-list">
                  {step.responses ? (
                    step.responses.map((response) => (
                      <li id={response._id} key={response._id}>
                        <h3>{response.text}</h3>
                        {response.photo ? (
                          <img src={response.photo} alt={response.text} />
                        ) : (
                          <p>No photo</p>
                        )}
                        {response.nextStep ? (
                          <h3>{response.nextStep.step}</h3>
                        ) : (
                          <form data-id={response._id} onSubmit={submitNextStep}>
                            <h3>NO NEXT STEP SET</h3>
                            <select
                              name="nextStep"
                              onChange={onChangeEditForm}
                              defaultValue=""
                            >
                              <option value="">Pick a next Step</option>
                              {filterSteps(step._id).map((nextStep) => (
                                <option key={nextStep._id} value={nextStep._id}>
                                  {nextStep.step}
                                </option>
                              ))}
                            </select>
                            <button >Submit</button>
                          </form>
                        )}
                        {step.responses.length > 1 ? (
                          <button
                            data-id={step._id}
                            className="delete-btn"
                            id={response._id}
                            // onClick={deleteResponse}
                          >
                            DELETE
                          </button>
                        ) : (
                          <div>
                            <p>
                              Must have more than one response in a step before
                              you can delete a response.
                            </p>
                            <button disabled>DELETE</button>
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <h4>No responses</h4>
                  )}
                  <li>
                    <button
                      data-id={step._id}
                      className="add-btn"
                      onClick={createResponse}
                    >
                      Add Response
                    </button>
                  </li>
                </ol>
              </div>
            ))}
          </div>
          {responseIsOpen.createResponse ? <CreateResponseForm /> : null}
        </div>
      )}
    </div>
  );
}

export default EditStepDetails;
