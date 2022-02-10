import React, { useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
// import { useGlobalReducer } from "../../utils/Reducer";
import { useParams } from "react-router-dom";
import { QUERY_STEP } from "../../utils/queries";
import { useQuery } from "@apollo/client";

function StepDetails() {
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  console.log(state);
  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useQuery(QUERY_STEP, {
    variables: { id },
  });
  if (data) {
    const { step } = data;
    console.log(step);
  }

  return (
    <section>
      {data ? (
        <div>
          <h1>{data.step.step}</h1>
          <h2>{data.step.description}</h2>
          {data.step.responses.map((response) => (
            <div>
              {response.photo ? (
                <img src={response.photo} alt={response.text}></img>
              ) : null}
              <a href={"/step/" + response.nextStep}>{response.text}</a>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default StepDetails;
