import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function FeedbackForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Problem</label>
      <input type="text" name="problem" />
      <label>Step</label>
      <input type="text" name="step" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default FeedbackForm;
