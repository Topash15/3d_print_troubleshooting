import React, { useEffect, useState } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS, QUERY_ALL_STEPS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_PROBLEMS } from "../../utils/actions";

function EditForm() {
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

  const [selectedProblem, setSelectedProblem] = useState({ problemId: "" });
  const selectProblem = (e) => {
    const { id } = e.target;
    setSelectedProblem({ problemId: id });
  };

  const {
    loading: stepsLoading,
    error: stepsError,
    data: stepsData,
  } = useQuery(QUERY_ALL_STEPS, {
    variables: selectedProblem.problemId,
  });

  console.log(stepsData);

  return (
    <div>
      {!selectedProblem.problemId ? (
        <div>
          <h1>Select a problem to edit</h1>
          <p>
            Once selected, you can edit existing problems and responses within
            the problem.
          </p>
          <div>
            {problemData ? (
              <div className="problem-card-container">
                {problemData.problems.map((problem) => (
                  <div
                    id={problem._id}
                    className="problem-card"
                    key={problem._id}
                  >
                    <h2 className="problem-card-title">{problem.name}</h2>
                    <p className="problem-card-description">
                      {problem.description}
                    </p>
                    {problem.photos ? (
                      <img
                        className="problem-card-image"
                        alt={problem.name}
                        src={problem.photos}
                      ></img>
                    ) : (
                      <p>No photo</p>
                    )}
                    <a className="problem-card-link" href={problem.link}>
                      {problem.links}
                    </a>
                    <h3 className="problem-step-total">
                      Total Steps: {problem.steps.length}
                    </h3>
                    <h3 className="problem-first-step">First Step: </h3>
                    {problem.firstStep ? (
                      <div className="first-step-div">
                        <h4 className="first-step-title">
                          {problem.firstStep.step}
                        </h4>
                        <p className="first-step-description">
                          {problem.firstStep.description}
                        </p>
                      </div>
                    ) : (
                      <div className="first-step-div">
                        <h4>No First Step Defined</h4>
                      </div>
                    )}
                    <button id={problem._id} onClick={selectProblem}>
                      Select
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          {stepsData ? (
            <div>
              <div className="problem-container">
                <h1>Problem</h1>
                <h3>Problem name :{stepsData.steps[0].category.name}</h3>
                <h3>
                  Problem Description :{stepsData.steps[0].category.description}
                </h3>
                {stepsData.steps[0].category.link ? (
                  <a
                    href={stepsData.steps[0].category.link}
                  />
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
                ):(
                  <h3>No first step specified. Please select a first step.</h3>
                )}
              </div>
              <div className="step-card-container">
              <h2>Steps</h2>
              {stepsData.steps.map((step) => (
                <div key={step._id} className="step-card">
                  <h2>{step.step}</h2>
                  <p>{step.description}</p>
                  <h2>Responses</h2>
                  {step.responses.map((response) => (
                    <div key={response._id}>
                      <h3>{response.text}</h3>
                      {response.photo ? (
                        <img src={response.photo} alt={response.text} />
                      ) : (
                        <p>No photo</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default EditForm;
