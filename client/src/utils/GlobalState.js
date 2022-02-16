import React, { createContext, useContext } from 'react';
import { useGlobalReducer } from './reducers';

// creates global context
const GlobalContext = createContext();

// sets initial global state by calling global reducer
// returns provider for so other components can access state
const GlobalProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useGlobalReducer({
        problems: [],
        currentProblem: '',
        currentStep: '',
        action: '',
        type: ''
    });
    console.log(state)
    return <GlobalContext.Provider value = {[state,dispatch]} {...props} />;
};

// 
const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export {GlobalProvider, useGlobalContext};