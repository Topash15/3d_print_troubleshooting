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
  // console.log(id);

  const { loading, error, data } = useQuery(QUERY_STEP, {
    variables: { id },
  });
  if (data) {
    const { step } = data;
    // console.log(step);
  }

  const navigate = useNavigate();

  const loadNextStep = (id) => {
    console.log(id);
    if (id) {
      navigate("/step/" + id);
    } else {
      navigate("/404");
    }
  };

  return (
    <section>
      {data ? (
        <div key={data._id}>
          <h1>{data.step.step}</h1>
          <h2>{data.step.description}</h2>
          {data.step.responses.map((response) => (
            <div key={response._id}>
              {response.photo ? (
                <img src={response.photo} alt={response.text}></img>
              ) : null}
              <button
                id={response.nextStep}
                onClick={()=>{loadNextStep(response.nextStep)}}
                href={"/#/step/" + response.nextStep}
              >
                {response.text}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default StepDetails;
