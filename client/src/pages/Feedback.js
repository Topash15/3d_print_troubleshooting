import React from "react";

// import components
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FeedbackForm from "../components/FeedbackForm";

function Feedback(){
    return (
        <div>
            <Nav />
            <FeedbackForm />
            <Footer />
        </div>
    )
}

export default Feedback;