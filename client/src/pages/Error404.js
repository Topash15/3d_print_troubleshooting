import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Error404 = () => {
  return (
    <div>
      <Nav />
      <h1>404 Page Not Found</h1>
      <p>
        Oops! This page doesn't exist. Try going back and selecting a different
        option. <br /> You can also click the feedback link above or below to let me
        know what you were doing before you were sent here. <br /> That way I
        can fix it. Thanks!{" "}
      </p>
      <Footer />
    </div>
  );
};

export default Error404;
