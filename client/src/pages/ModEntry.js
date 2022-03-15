import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EditSelectionForm from "../components/EditSelectionForm";

function CreateEntry() {
  return (
    <div>
      <Nav />
      <EditSelectionForm />
      <Footer />
    </div>
  );
}

export default CreateEntry;
