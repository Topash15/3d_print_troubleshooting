import React from 'react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import EditStepDetails from '../components/EditStepDetails';

function ManageStep(){
    return(
        <div>
            <Nav/>
            <EditStepDetails/>
            <Footer/>
        </div>
        )
}

export default ManageStep;