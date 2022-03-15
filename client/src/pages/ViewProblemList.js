import React from 'react';

// Components
import Nav from '../components/Nav';
import ProblemList from '../components/ProblemList';
import Footer from '../components/Footer';

function ViewProblemList (){
    return(
        <div>
            < Nav />
            < ProblemList />
            < Footer />
        </div>
    )
}

export default ViewProblemList