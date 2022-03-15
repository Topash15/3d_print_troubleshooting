import React, { useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
// import { useGlobalReducer } from "../../utils/Reducer";
import { useParams } from "react-router-dom";
import { QUERY_STEP } from "../../utils/queries";
import { EDIT_STEP } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CURRENT_STEP } from "../../utils/actions";
import { useNavigate } from "react-router-dom";

function StepDetails() {
  const navigate = useNavigate();
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  const { id } = useParams();

  // queries db for current step data
  const { loading, error, data } = useQuery(QUERY_STEP, {
    variables: { id },
  });

  // if no data available and is not loading, redirect to 404
  if (!data && !loading) {
    navigate("/404");
  }
  if (data) {
    const { step } = data;
    // if no step data is available, redirect to 404
    if (!step) {
      navigate("/404");
    }
  }

  // used to load next step
  const loadNextStep = (id) => {
    navigate("/step/" + id);
  };

  // allows for editing step mutation
  const [editStep] = useMutation(EDIT_STEP);

  // used to add to step success counter
  const addSuccess = async (prevCount) => {
    prevCount++;
    const mutationResponse = await editStep({
      variables: {
        id: id,
        successCount: prevCount,
      },
    });
    navigate('/view-problem-list')
  };

  // update total count
  const updateTotalCount = async (prevCount) => {
    prevCount++;
    const mutationResponse = await editStep({
      variables: {
        id: id,
        totalCount: prevCount,
      },
    });
  };

  // calculate success percentage
  const calcSuccessPercentage = (successCount, Total) => {
    return ((successCount / Total) * 100).toFixed(2);
  };

  return (
    <section className="step-section">
      <div className="section-title-container">
        <h1 className="section-title">Try out this step!</h1>
      </div>
      {data ? (
        <div className="step-container" key={data._id}>
          <div className="step-text">
            <h1 className="step-title">{data.step.step}</h1>
            <p className="step-success-rate">
              This step works{" "}
              {calcSuccessPercentage(
                data.step.successCount,
                data.step.totalCount
              )}
              % of the time. ({data.step.successCount}/{data.step.totalCount})
            </p>
            <p className="step-description">{data.step.description}</p>
          </div>
          <ul className="response-list">
            <li className="response-list-item">
              <button
                className=" step-response-button"
                onClick={() => {
                  addSuccess(data.step.successCount);
                  updateTotalCount(data.step.totalCount);
                }}
              >
                Solved!
              </button>
            </li>
            {data.step.responses.map((response) => (
              <li className="response-list-item" key={response._id}>
                {response.photo ? (
                  <img src={response.photo} alt={response.text}></img>
                ) : null}
                {response.nextStep ? (
                  <button
                    className="step-response-button"
                    id={response.nextStep._id}
                    onClick={() => {
                      updateTotalCount(data.step.totalCount);
                      loadNextStep(response.nextStep._id);
                    }}
                    href={"/step/" + response.nextStep._id}
                  >
                    {response.text}
                  </button>
                ) : (
                  <button
                    className="step-response-button"
                    disabled
                    onClick={() => updateTotalCount(data.step.totalCount)}
                  >
                    {response.text}
                    <span className="response-notice">
                      This option does not have a next step
                    </span>
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
