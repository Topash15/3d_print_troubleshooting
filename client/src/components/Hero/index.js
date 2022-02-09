import React, {useEffect} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
// import { idbPromise } from "../../utils/helper";
import { UPDATE_PROBLEMS } from '../../utils/actions'

function Hero() {
  const [state, dispatch] = useStoreContext();
  console.log("state");
  console.log(state);

  const { loading, error, data: problemData} = useQuery(QUERY_ALL_PROBLEMS);
  if (loading) {
      console.log('loading')
  } else if (error) {
      console.log(error)
  }
  const {problems} = state;
  

//   useEffect(() => {
//     if (data) {
//       dispatch({
//         type: UPDATE_PROBLEMS,
//         problems: data.problems,
//       });
//       data.problems.forEach((problem) => {
//         idbPromise("problems", "put", problem);
//       });
//     } else if (!loading) {
//       idbPromise("problems", "get").then((problems) => {
//         dispatch({
//           type: UPDATE_PROBLEMS,
//           problems: problems,
//         });
//       });
//     }
//   }, [data, loading, dispatch]);

  return (
    <div>
      {problems.map((problem) => (
          <div key={problem._id}>
            <h2>{problem.name}</h2>
            <p>{problem.description}</p>
          </div>
      ))}      
    </div>
  );
}

export default Hero;
