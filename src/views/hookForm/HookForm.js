import React from 'react';
import { useForm } from 'react-hook-form';
import './formhook.scss';

const HookForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <form className="form-submit">
                <div className="">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="First name" {...register("firstname", { required: true, maxLength: 80 })} />
                    {errors.firstname && errors.firstname.type === "required" && <span>This is required</span>}
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" placeholder="Last name" {...register("lastname", { required: true, maxLength: 100 })} />
                    {errors.lastname && errors.lastname.type === "required" && <span>This is required</span>}
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.Email && errors.Email.type === "required" && <span>This is required</span>}
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input type="tel" placeholder="Mobile number" {...register("Mobile_number", { required: true, minLength: 6, maxLength: 12 })} />
                    {errors.Mobile_number && errors.Mobile_number.type === "required" && <span>This is required</span>}
                </div>
                <input type="submit" onClick={handleSubmit(onSubmit)} />
            </form>

        </>
    );
};

export default HookForm;
