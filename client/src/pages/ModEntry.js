import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OptionForm from "../components/OptionForm";
import CreateStepForm from "../components/CreateStepForm";
import EditSelectionForm from "../components/EditSelectionForm";

function CreateEntry() {
  return (
    <div>
      <Nav />
      {/* <OptionForm /> */}
      <CreateStepForm />
      <EditSelectionForm />
      <Footer />
    </div>
  );
}

export default CreateEntry;
