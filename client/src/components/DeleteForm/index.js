import React from "react";
import "./style.css";

function createStep() {
  return (
    <div>
      <form>
        <h1>Step</h1>
        <label>Name</label>
        <input type="text"></input>
        <label>Description</label>
        <textarea name="name" type="text"></textarea>
        <label>Photo Direct Link</label>
        <input type="text"></input>
        <label>Useful URL</label>
        <input type="text"></input>
      </form>
    </div>
  );
}

export default createStep;
