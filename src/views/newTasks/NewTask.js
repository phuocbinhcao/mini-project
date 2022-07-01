import React from 'react';
import "../allTasks/alltask.scss";

const NewTask = (props) => {
    const { newTask } = props;
    const changeStatus = () => {
        if (newTask.status === "new") {
            return ("New")
        }
    }
    return (
        <div className="card-task">
            <p className="title">Title: {newTask.title}</p>
            <p className="creator">Creator: {newTask.creator}</p>
            <p className={`${changeStatus()}`}>
                Status:&ensp;
                {changeStatus()}
            </p>
            <p className="line"></p>
            <div className="description"><span>Description:</span>
                <p>{newTask.description}</p>
            </div>
        </div>
    );
};

export default NewTask;