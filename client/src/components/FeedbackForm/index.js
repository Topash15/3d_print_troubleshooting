import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";

function FeedbackForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateFeedback()) {
      emailjs
        .sendForm(
          "service_l5aan6o",
          "template_2k1x2dp",
          form.current,
          "user_6LeDgfqXZFhGlBkRsgZha"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.log('error!')
    }
  };

  const validateFeedback = () => {
    let formMessage = form.current[4].value;
    if (!formMessage) {
      console.log('message required')
      return false;
    }
    return true;
  };

  return (
    <section className="feedback-section">
      <div className="section-title-container">
        <h1 className="section-title">What can I help you with?</h1>
      </div>
      <div className="feedback-text-div">
        <h1>Have feedback?</h1>
        <p>
          If you have any suggestions for how the site should operate or any
          suggestions for problems, steps, or responses, fill out the form
          below.
        </p>
      </div>
      <div className="feedback-form-container">
        <form className="feedback-form" ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input className="feedback-input" type="text" name="user_name" />
          <label>Email</label>
          <input className="feedback-input" type="email" name="user_email" />
          <label>Problem</label>
          <input className="feedback-input" type="text" name="problem" />
          <label>Step</label>
          <input className="feedback-input" type="text" name="step" />
          <label>Message*</label>
          <textarea className="feedback-input" name="message" />
          <input className="feedback-button" type="submit" value="Send" />
        </form>
      </div>
    </section>
  );
}

export default FeedbackForm;
