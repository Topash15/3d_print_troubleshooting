  // RESPONSE CREATE FUNCTIONS
  // creates state for response form
  const [responseForm, setResponseForm] = useState({
    text: "",
    step: "",
    nextStep: "",
    problem: "",
    steps: [],
    errors: [],
  });

  // creates function for adding response to database
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const [addResponseToStep] = useMutation(ADD_RESPONSE_TO_STEP);

  async function submitResponseHandler(e) {
    e.preventDefault();
    const valid = await validateResponse(responseForm);

    if (!valid) {
      console.log(responseForm.errors);
      return;
    } else {
      const mutationResponse = await createResponse({
        variables: {
          text: responseForm.text,
          photo: responseForm.photo,
        },
      });
      const responseId = mutationResponse.data.addResponse._id;
      const stepMutationResponse = await addResponseToStep({
        variables: {
          id: responseForm.step,
          responses: responseId,
        },
      });
    }
    window.location.reload();
  }

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseForm({
      ...responseForm,
      [name]: value,
    });
    console.log(responseForm);
  };

  const filterSteps = () => {
    if (responseForm.problem) {
      let chosenProblem = state.problems.filter(
        (problem) => problem._id === responseForm.problem
      );
      return chosenProblem[0].steps;
    }
  };

  const validateResponse = async (responseForm) => {
    const { text } = responseForm;
    const errors = [];

    if (!text) {
      errors.push({ type: "text", message: "Valid text is required" });
    }

    setResponseForm({
      ...responseForm,
      errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

<form className="form createResponse" onSubmit={submitResponseHandler}>
<h1>Response</h1>
<label>
  First you must select which problem and step the response is for
</label>
{problemData ? (
  <select name="problem" onChange={handleResponseChange}>
    <option value="">Choose a problem</option>
    {problemData.problems.map((problem) => (
      <option key={problem._id} value={problem._id}>
        {problem.name}
      </option>
    ))}
  </select>
) : null}
{responseForm.problem ? (
  <select name="step" defaultValue="" onChange={handleResponseChange}>
    <option value="">Choose a step</option>
    {filterSteps().map((step) => (
      <option
        key={step._id}
        value={step._id}
        onChange={handleResponseChange}
      >
        {step.step}
      </option>
    ))}
  </select>
) : null}
<label>Name</label>
<input type="text" name="text" onChange={handleResponseChange}></input>
<label>Description</label>
<textarea
  name="description"
  type="text"
  onChange={handleResponseChange}
></textarea>
<label>Photo Direct Link</label>
<input type="text" name="photo" onChange={handleResponseChange}></input>
<label>Useful URL</label>
<input type="text" name="link" onChange={handleResponseChange}></input>
<label>Add another Response?</label>
{/* if checked, add second response form */}
<input type="checkbox"></input>
<button>Submit</button>
</form>