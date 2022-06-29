import React, { useEffect, useState } from "react";
import "./detailTask.scss";
import { useHistory, useParams } from "react-router";
import { getTaskById } from "../apis/TaskApi";

const DetailTask = ({ handleUpdateTask, handleDeleteTask }) => {
    let history = useHistory();
    let { id } = useParams();
    const [fieldDetails, setFieldDetails] = useState({
        id: "",
        title: "",
        creator: "",
        createAt: "",
        description: "",
        status: "",
    });

    const handleBack = () => {
        history.push("/all-task");
    };
    //get data api
    useEffect(() => {
        getDataById(id);
    }, []);

    const getDataById = async (id) => {
        try {
            const data = await getTaskById(id);
            data &&
                setFieldDetails({
                    id: data.id,
                    title: data.title,
                    creator: data.creator,
                    createAt: data.createAt,
                    description: data.description,
                    status: data.status,
                });
        } catch (error) {
            console.log(error);
        }
    };
    //reset input
    const handleReset = () => {
        setFieldDetails('')
    };
    //input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFieldDetails({
            ...fieldDetails,
            [name]: value,
        });
    };
    //Update data
    const handleUpdate = () => {
        let newTask = {
            id: fieldDetails.id,
            title: fieldDetails.title,
            creator: fieldDetails.creator,
            createAt: fieldDetails.createAt,
            description: fieldDetails.description,
            status: fieldDetails.status,
        };
        handleUpdateTask(newTask);
        history.push("/all-task");
    };

    //delete
    const handleDelete = (id) => {
        handleDeleteTask(id);
        history.push("/all-task");
    };

    return (
        <>
            <button className="btn-back" onClick={handleBack}>
                &lt;&lt; Back
            </button>
            <div className="form">
                <h1>Detail Task </h1>
                <div className="form-container">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={fieldDetails.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Creator</label>
                        <input
                            type="text"
                            name="creator"
                            placeholder={fieldDetails.creator}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Created at</label>
                        <input
                            type="text"
                            name="createAt"
                            placeholder={fieldDetails.createAt}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder={fieldDetails.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="change-status">
                        <div className="checked-group">
                            <label className={`${fieldDetails.status === "new" && "new"}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    checked={fieldDetails.status === "new" && true}
                                    onChange={handleChange}
                                    value="new"
                                />
                                New
                            </label>
                        </div>
                        <div className="checked-group">
                            <label className={`${fieldDetails.status === "doing" && "doing"}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    checked={fieldDetails.status === "doing" && true}
                                    onChange={handleChange}
                                    value="doing"
                                />
                                Doing
                            </label>
                        </div>
                        <div className="checked-group">
                            <label className={`${fieldDetails.status === "done" && "done"}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    checked={fieldDetails.status === "done" && true}
                                    onChange={handleChange}
                                    value="done"
                                />
                                Done
                            </label>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={handleReset}>Reset</button>
                        <button onClick={() => handleDelete(fieldDetails.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailTask;
