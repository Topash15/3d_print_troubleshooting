import React from "react";
import "./style.css";

function AboutComponent() {
  return (
    <section data-test-id="about" id="about" className="about-section flex-column">
      <h1>About</h1>
      <div className="about-container">
        <div className="about-item">
          <h2 className="about-item-title">Our Goal</h2>
          <p className="about-item-text">
            The goal of 3D Assistant is to simplify the process of
            troubleshooting your 3D printer. This hobby is full of twists and
            turns that can make it difficult to simply print your creation.
          </p>
        </div>
        <div className="about-item">
          <h2 className="about-item-title">
            How do we make it easy to troubleshoot?
          </h2>
          <p className="about-item-text">
            We are creating a collection of problems that you may experience as
            well as the steps required to resolve those problems. To get
            started, select the problem you are having and follow each step as
            it is presented. If that step doesn't fix your problem, select the
            appropriate option and the 3D Assistant with take you to the next
            best step. Once a step resolves your problem, click the{" "}
            <i>Solved</i> button. We collect how often a step resolves a problem
            so we can adjust the order to shorten the troubleshooting process as
            much as possible.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutComponent;
