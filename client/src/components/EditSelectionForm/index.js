import React, { useEffect, useState } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_PROBLEMS } from "../../utils/actions";
import {useNavigate} from 'react-router-dom'
import plus from '../../assets/plus.svg'
import CreateProblemForm from "../CreateProblemForm";


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

  // used to select step from main page
  const navigate = useNavigate();
  const selectProblem = (e) => {
    const { id } = e.target;
    navigate(`/edit-problems/${id}`);
  };

  const [problemIsOpen, setProblemIsOpen] = useState({createProblem: false});

  const createProblem = (e) => {
    setProblemIsOpen({
      createProblem: true
    })
  }

  return (
    <div>
        {problemIsOpen.createProblem ? (<CreateProblemForm />):(
        <div>
          <h1>Select a problem to edit</h1>
          <p>
            Once selected, you can edit existing problems and responses within
            the problem.
          </p>
          <div>
            {problemData ? (
              <div className="problem-card-container">
                <div className="problem-card" id="add-problem" onClick={createProblem}>
                  <h2 className="problem-card-title">Add a problem</h2>
                  <img className="problem-card-image" src={plus} alt="add Problem"/>
                </div>
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
                        {/* <p className="first-step-description">
                          {problem.firstStep.description}
                        </p> */}
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
        )}
    </div>
  );
}

export default EditForm;
