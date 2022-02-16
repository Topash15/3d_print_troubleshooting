import React from 'react';
import './style.css';

function EntryForm(){

    return (
        <section>
            <form>
                <h2>What would you like to do?</h2>
                <select>
                    <option value="create">Create</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                </select>
                <select>
                    <option value="problem">Problem</option>
                    <option value="step">Steps</option>
                    <option value='response'>Responses</option>
                </select>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default EntryForm;