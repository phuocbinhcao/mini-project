import React, { useState } from 'react';
import "../views/createTask.scss";
import { useHistory } from 'react-router';

const CreateTask = ({ onAddNew }) => {
    const [fields, setFields] = useState({
        title: '',
        creator: '',
        createAt: new Date().toLocaleString(),
        description: '',
        status: "new"
    });

    let history = useHistory();

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value
        })
    }

    const handleSubmitForm = () => {
        onAddNew(fields);
        history.push("/all-task")
    }

    return (
        <div className="form">
            <h1>Create new task</h1>
            <div className="form-container">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Creator</label>
                    <input
                        type="text"
                        placeholder="Creator"
                        name="creator"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Created at</label>
                    <input
                        type="text"
                        placeholder={fields.createAt}
                        name="createAt"
                        onChange={onHandleChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="btn-container">
                    <button onClick={handleSubmitForm}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;