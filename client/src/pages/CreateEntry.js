import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OptionForm from "../components/OptionForm";
import CreateForm from "../components/CreateForm";
import EditForm from "../components/EditForm";

function CreateEntry() {
  return (
    <div>
      <Nav />
      {/* <OptionForm /> */}
      {/* <CreateForm /> */}
      <EditForm />
      <Footer />
    </div>
  );
}

export default CreateEntry;
