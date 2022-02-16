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
  console.log(state);

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

  const selectProblem = (id) => {
    dispatch({
      type: UPDATE_CURRENT_PROBLEM,
      currentProblem: id,
    });
    navigate("/step/" + id);
  };

  return (
    <section className="problem-section">
      {/* future search bar */}
      <div className="problem-card-container">
        {problemData
          ? problemData.problems.map((problem) => (
              <div key={problem._id} className="problem-card">
                <h2 className="problem-card-title">{problem.name}</h2>
                <p className="problem-card-description">
                  {problem.description}
                </p>
                {problem.photos ? (
                  <img
                    alt={problem.name}
                    className="problem-card-image"
                    src={problem.photos}
                  ></img>
                ) : null}
                <a className="problem-card-link" href={problem.link}>
                  Click here to learn more
                </a>
                <button
                  className="problem-card-btn"
                  onClick={() => {
                    selectProblem(problem.firstStep._id);
                  }}
                >
                  This is my Problem
                </button>
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default ProblemList;
