import React, { useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
// import { useGlobalReducer } from "../../utils/Reducer";
import { useParams } from "react-router-dom";
import { QUERY_STEP } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_CURRENT_STEP } from "../../utils/actions";
import { useNavigate } from "react-router-dom";

function EditStepDetails() {
  // call globalstate
  const [state, dispatch] = useGlobalContext();
  const { id } = useParams();

  // queries db for current step data
  const { loading, error, data } = useQuery(QUERY_STEP, {
    variables: { id },
  });
  if (data) {
    const { step } = data;
  }
}

export default EditStepDetails;
