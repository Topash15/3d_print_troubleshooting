import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OptionForm from "../components/OptionForm";
import CreateForm from "../components/CreateForm";

function CreateEntry() {
  return (
    <div>
      <Nav />
      <OptionForm />
      <CreateForm />
      <Footer />
    </div>
  );
}

export default CreateEntry;
