import React from 'react';
import "./alltask.scss";

const DoingTask = (props) => {
    const { doingTasks } = props;
    const changeStatus = () => {
        if (doingTasks.status === "doing") {
            return ("Doing")
        }
    }
    return (
        <div className="card-task">
            <p className="title">Title: {doingTasks.title}</p>
            <p className="creator">Creator: {doingTasks.creator}</p>
            <p className={`${(doingTasks.status === "doing" && "doing")}`}>
                Status:&ensp;
                {changeStatus()}
            </p>
            <p className="line"></p>
            <div className="description"><span>Description:</span>
                <p>{doingTasks.description}</p>
            </div>
        </div>
    );
};

export default DoingTask;