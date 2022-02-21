import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OptionForm from "../components/OptionForm";
import CreateStepForm from "../components/CreateStepForm";
import EditForm from "../components/EditForm";

function CreateEntry() {
  return (
    <div>
      <Nav />
      {/* <OptionForm /> */}
      <CreateStepForm />
      <EditForm />
      <Footer />
    </div>
  );
}

export default CreateEntry;
