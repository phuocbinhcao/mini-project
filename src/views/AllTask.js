import React from 'react';
import "./alltask.scss";
import { Link } from 'react-router-dom';

const AllTask = (props) => {
    const { task, handleGetTask } = props;

    const changeStatus = () => {
        if (task.status === "new") {
            return ("New")
        } else if (task.status === "doing") {
            return ("Doing")
        } else {
            return ("Done")
        }
    }

    return (
        <div className="card-task" onClick={() => handleGetTask(task)}>
            <Link to={`/task/${task.id}`}>
                <p className="title">Title: {task.title}</p>
                <p className="creator">Creator: {task.creator}</p>
                <p className={`${changeStatus()}`}>
                    Status:&ensp;
                    {changeStatus()}
                </p>
                {/* <p className={`${(task.status === "new" && "new") || (task.status === "doing" && "doing") || (task.status === "done" && "done")}`}>
                    Status:&ensp;
                    {changeStatus()}
                </p> */}
                <p className="line"></p>
                <div className="description"><span>Description:</span>
                    <p>{task.description}</p>
                </div>
            </Link>
        </div>
    );
};

export default AllTask;