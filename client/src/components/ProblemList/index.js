import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helper";
import { UPDATE_PROBLEMS, UPDATE_CURRENT_PROBLEM } from "../../utils/actions";
import { useNavigate } from "react-router-dom";
import "./style.css";

function ProblemList() {
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
      problemData.problems.forEach((problem) => {
        idbPromise("problems", "put", problem);
      });
    } else if (!loading) {
      idbPromise("problems", "get").then((problems) => {
        dispatch({
          type: UPDATE_PROBLEMS,
          problems: problemData.problems,
        });
      });
    }
  }, [problemData, loading, dispatch]);

  const navigate = useNavigate();

  const selectProblem = (firstStep) => {
    if (firstStep) {
      const { _id } = firstStep;
      dispatch({
        type: UPDATE_CURRENT_PROBLEM,
        currentProblem: _id,
      });
      navigate("/step/" + _id);
    } else {
      navigate("/404");
    }
  };

  return (
    <section className="problem-section">
      {/* future search bar */}
      <div className="section-title-container">
        <h1 className="section-title">What problem are you experiencing?</h1>
      </div>
      <div className="problem-card-container">
        {problemData ? (
          problemData.problems.map((problem) => (
            <button
              key={problem._id}
              className="problem-card"
              onClick={() => {
                selectProblem(problem.firstStep);
              }}
            >
              {problem.photos ? (
                <img
                  alt={problem.name}
                  className="problem-card-image"
                  src={problem.photos}
                ></img>
              ) : null}
              <h2 className="problem-card-title">{problem.name}</h2>
              <p className="problem-card-description">{problem.description}</p>
            </button>
          ))
        ) : (
          <div>No problems found</div>
        )}
      </div>
    </section>
  );
}

export default ProblemList;
