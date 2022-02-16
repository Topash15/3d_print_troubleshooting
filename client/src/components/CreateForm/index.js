import React, { useState, useEffect } from "react";
import "./style.css";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ALL_PROBLEMS } from "../../utils/queries";
import { UPDATE_PROBLEMS } from "../../utils/actions";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PROBLEM, CREATE_STEP } from "../../utils/mutations";

function EntryForm() {
  // creates state for problem form
  // const [problemForm, setProblemForm] = useState({
  //   name: "",
  //   description: "",
  //   photo: "",
  //   errors: [],
  // });

  // const [createProblem] = useMutation(CREATE_PROBLEM);

  // async function submitHandler(e) {
  //   e.preventDefault();
  //   const valid = await validate(problemForm);

  //   if (!valid) {
  //     console.log(problemForm.errors);
  //     return;
  //   } else {
  //     const mutationResponse = await createProblem({
  //       variables: {
  //         name: problemForm.name,
  //         description: problemForm.description,
  //         photos: problemForm.photo,
  //       },
  //     });
  //   }
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProblemForm({
  //     ...problemForm,
  //     [name]: value,
  //   });
  //   console.log(problemForm);
  // };

  // const validate = async (problemForm) => {
  //   const { name, description } = problemForm;
  //   const errors = [];

  //   if (!name) {
  //     errors.push({ type: "name", message: "Valid name is required" });
  //   }
  //   if (!description) {
  //     errors.push({
  //       type: "description",
  //       message: "Valid description is required",
  //     });
  //   }

  //   setProblemForm({
  //     ...problemForm,
  //     errors,
  //   });

  //   if (errors.length > 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // creates state for step form
  const [stepForm, setStepForm] = useState({
    name: "",
    description: "",
    link: "",
    photo: "",
    problem: "",
    errors: [],
  });

  // creates function for adding step to database
  const [createStep] = useMutation(CREATE_STEP);

  async function submitStepHandler(e) {
    e.preventDefault();
    const valid = await validateStep(stepForm);

    if (!valid) {
      console.log(stepForm.errors);
      return;
    } else {
      const mutationResponse = await createStep({
        variables: {
          step: stepForm.name,
          description: stepForm.description,
          photos: stepForm.photo,
          links: stepForm.link,
          category: stepForm.problem,
        },
      });
    }
  }

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepForm({
      ...stepForm,
      [name]: value,
    });
    console.log(stepForm);
  };

  const validateStep = async (stepForm) => {
    const { name, description } = stepForm;
    const errors = [];

    if (!name) {
      errors.push({ type: "name", message: "Valid name is required" });
    }
    if (!description) {
      errors.push({
        type: "description",
        message: "Valid description is required",
      });
    }

    setStepForm({
      ...stepForm,
      errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  //   queries db for all Problems
  const { loading, error, data: problemData } = useQuery(QUERY_ALL_PROBLEMS);
  if (loading) {
    console.log("loading");
  } else if (error) {
    console.log(error);
  }

  return (
    <section>
      {/* <form className="form createProblem" onSubmit={submitHandler}>
        <h1>Problem</h1>
        <label>Title</label>
        <input name="name" type="text" onChange={handleChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input name="photo" type="text" onChange={handleChange}></input>
        <button type="submit"> Submit </button>
      </form> */}
      <form className="form createStep" onSubmit={submitStepHandler}>
        <h1>Step</h1>
        <label>To which problem does this step belong?</label>
        {problemData ? (
          <select name="problem" onChange={handleStepChange}>
            {problemData.problems.map((problem) => (
              <option key={problem._id} value={problem._id}>
                {problem.name}
              </option>
            ))}
          </select>
        ) : null}
        <label>Title</label>
        <input type="text" name="name" onChange={handleStepChange}></input>
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          onChange={handleStepChange}
        ></textarea>
        <label>Photo Direct Link</label>
        <input name="photo" type="text" onChange={handleStepChange}></input>
        <label>Useful URL</label>
        <input name="link" type="text" onChange={handleStepChange}></input>
        <button type="submit"> Submit </button>
      </form>
      {/* <h1>Response</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name" type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
        <label>Add another Response?</label>
        if checked, add second response form */}
      <input type="checkbox"></input>
    </section>
  );
}

export default EntryForm;
