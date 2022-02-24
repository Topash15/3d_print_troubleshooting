import React from 'react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import EditProblemDetails from '../components/EditProblemDetails';

function ManageProblem(){
    return(
        <div>
            <Nav/>
            <EditProblemDetails/>
            <Footer/>
        </div>
        )
}

export default ManageProblem;