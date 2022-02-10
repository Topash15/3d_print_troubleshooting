import React, {useEffect} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState";
// import { idbPromise } from "../../utils/helper";
import { UPDATE_PROBLEMS } from '../../utils/actions'

function Hero() {
    // calls global state
  const [state, dispatch] = useGlobalContext();
  console.log("state");
  console.log(state);

//   queries db for all Problems
  const { loading, error, data: problemData} = useQuery(QUERY_ALL_PROBLEMS);
  if (loading) {
      console.log('loading')
  } else if (error) {
      console.log(error)
  }
  console.log('data')
  console.log(problemData);
 

  useEffect(() => {
    if (problemData) {
      dispatch({
        type: UPDATE_PROBLEMS,
        problems: problemData.problems,
      });
      console.log('problems updated')
    }
  }, [problemData, loading, dispatch]);

  return (
    <div>
      {problemData ? (problemData.problems.map((problem) => (
          <div key={problem._id}>
            <h2>{problem.name}</h2>
            <p>{problem.description}</p>
          </div>
      ))): null}      
    </div>
  );
}

export default Hero;
