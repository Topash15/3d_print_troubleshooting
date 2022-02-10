import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState";
// import { idbPromise } from "../../utils/helper";
import { UPDATE_PROBLEMS } from "../../utils/actions";
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
    }
  }, [problemData, loading, dispatch]);

  return (
    <section className="problem-section">
      {/* future search bar */}
      <div className="problem-card-container">
        <div className="problem-card">
          <h2 className="problem-card-title">Dummy Problem</h2>
          <p className="problem-card-description">Description goes here</p>
          <img
            alt=""
            className="problem-card-image"
            src="https://i.imgur.com/aD2DE2D.jpeg"
          ></img>
          <a className="problem-card-link" href="http://www.google.com">
            Click here to learn more
          </a>
          <button className="problem-card-btn">This is my Problem</button>
        </div>
        <div className="problem-card">
          <h2 className="problem-card-title">Dummy Problem</h2>
          <p className="problem-card-description">Description goes here</p>
          <img
            className="problem-card-image"
            src="https://i.imgur.com/aD2DE2D.jpeg"
          ></img>
          <a className="problem-card-link" href="http://www.google.com">
            Click here to learn more
          </a>
          <button className="problem-card-btn">This is my Problem</button>
        </div>
        <div className="problem-card">
          <h2 className="problem-card-title">Dummy Problem</h2>
          <p className="problem-card-description">Description goes here</p>
          <img
            className="problem-card-image"
            src="https://i.imgur.com/aD2DE2D.jpeg"
          ></img>
          <a className="problem-card-link" href="http://www.google.com">
            Click here to learn more
          </a>
          <button className="problem-card-btn">This is my Problem</button>
        </div>
        {problemData
          ? problemData.problems.map((problem) => (
              <div key={problem._id} className="problem-card">
                <h2 className="problem-card-title">{problem.name}</h2>
                <p className="problem-card-description">
                  {problem.description}
                </p>
                <img
                  alt={problem.name}
                  className="problem-card-image"
                  src={problem.photos}
                ></img>
                <a className="problem-card-link" href={problem.link}>
                  Click here to learn more
                </a>
                <a id={problem.firstStep._id} className="problem-card-btn" href={`#` + problem.firstStep._id}>
                  This is my Problem
                </a>
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default ProblemList;
