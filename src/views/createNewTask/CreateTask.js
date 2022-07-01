import React, { useState } from 'react';
import "./createTask.scss";
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

const CreateTask = ({ onAddNew }) => {
    let history = useHistory();
    const createAt = new Date().toLocaleString()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const newData = {
            ...data,
            createAt: createAt,
            status: "new"
        }
        onAddNew(newData);
        history.push("/new-task")
    };

    return (
        <div className="form">
            <h1>Create new task</h1>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className="form-group__input">
                        <input type="text" placeholder="Title" {...register("title", { required: true, maxLength: 80, minLength: 3 })} />
                        {(errors.title && errors.title.type === "required") && <p ></p>}
                        {(errors.title && errors.title.type === "minLength") && <p ></p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="creator">Creator</label>
                    <div className="form-group__input">
                        <input type="text" placeholder="Creator" {...register("creator", { required: true })} />
                        {errors.creator && errors.creator.type === "required" && <p></p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="createAt">Created at</label>
                    <div className="form-group__input">
                        <input type="text" placeholder={createAt} {...register("createAt")} disabled />
                        {errors.createAt && errors.createAt.type === "required" && <p ></p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className="form-group__input">
                        <input type="tel" placeholder="Description" {...register("description", { required: true, minLength: 6, maxLength: 12 })} />
                        {errors.description && errors.description.type === "required" && <p ></p>}
                        {errors.description && errors.description.type === "minLength" && <p ></p>}
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={handleSubmit(onSubmit)}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;