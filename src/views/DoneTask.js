import React from 'react';

const DoneTask = (props) => {
    const { doneTasks } = props;
    const changeStatus = () => {
        if (doneTasks.status === "done") {
            return ("Done")
        }
    }
    return (
        <div className="card-task">
            <p className="title">Title: {doneTasks.title}</p>
            <p className="creator">Creator: {doneTasks.creator}</p>
            <p className={`${changeStatus()}`}>
                Status:&ensp;
                {changeStatus()}
            </p>
            <p className="line"></p>
            <div className="description"><span>Description:</span>
                <p>{doneTasks.description}</p>
            </div>
        </div>
    );
};

export default DoneTask;