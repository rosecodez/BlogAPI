import React from 'react';
import { useForm } from "react-hook-form";

export default function SignupForm () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
    localStorage.setItem(data.username, JSON.stringify({ 
        name: data.name, password: data.password 
    }));
    console.log(JSON.parse(localStorage.getItem(data.username)));
    };
    
    return ( 
        <>
            <p className="title">Signup Form</p>

            <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} />
                <input type="username" {...register("username", { required: true })} />
                {errors.username && <span style={{ color: "red" }}>
                    *username* is mandatory </span>}
                <input type="password" {...register("password")} />
                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    ); 
}