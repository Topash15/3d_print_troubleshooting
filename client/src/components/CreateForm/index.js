import React, {useState} from "react";
import "./style.css";
import {useGlobalContext} from '../../utils/GlobalState'

function EntryForm() {

    // calls global state
    const [state, dispatch] = useGlobalContext();
    console.log(state);

    // create problem
    // create step
    // edit problem to set firstStep to submitted step
    // submit responses
    // edit steps to show responses
    async function submitHandler(){

    } 

  return (
    <section>
      <form>
        <h1>Problem</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name"type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        {/* <h1>Step</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name"type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input> */}
        <h1>Response</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name"type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
        <label>Add another Response?</label>
        {/* if checked, add second response form */}
        <input type="checkbox"></input>
        <button> Submit </button>
      </form>
    </section>
  );
}

export default EntryForm;
