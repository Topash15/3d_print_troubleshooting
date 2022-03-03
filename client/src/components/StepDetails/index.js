import React, { useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
// import { useGlobalReducer } from "../../utils/Reducer";
import { useParams } from "react-router-dom";
import { QUERY_STEP } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_CURRENT_STEP } from "../../utils/actions";
import { useNavigate } from "react-router-dom";

function StepDetails() {
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  console.log(state);
  const { id } = useParams();

  // queries db for current step data
  const { loading, error, data } = useQuery(QUERY_STEP, {
    variables: { id },
  });
  if (data) {
    const { step } = data;
  }

  const navigate = useNavigate();

  // used to load next step
  const loadNextStep = (id) => {
    if (id) {
      navigate("/step/" + id);
    } else {
      // loads 404 page if next step not defined
      navigate("/404");
    }
  };

  return (
    <section>
      {data ? (
        <div className="step-container" key={data._id}>
          <h1>{data.step.step}</h1>
          <h2>{data.step.description}</h2>
          <ul className="response-list">
          <li>
            <button>Solved!</button>
          </li>
            {data.step.responses.map((response) => (
              <li className="response-list-item" key={response._id}>
                {response.photo ? (
                  <img src={response.photo} alt={response.text}></img>
                ) : null}
                {response.nextStep ? (
                  <button
                    id={response.nextStep._id}
                    onClick={() => {
                      loadNextStep(response.nextStep._id);
                    }}
                    href={"/step/" + response.nextStep._id}
                  >
                    {response.text}
                  </button>
                ) : (
                  <button disabled>
                    <p>This option does not have a next step</p>
                    {response.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default StepDetails;
