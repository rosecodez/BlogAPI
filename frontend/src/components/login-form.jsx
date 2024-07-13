import React from "react";
import { useState } from 'react';

import PropTypes from 'prop-types';

export default function LoginForm( { setToken } ) {
    const {register, handleSubmit, formState: { errors },} = useForm();

    const loginUser = async (credentials) => {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json());
    };

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            if (response.token) {
                setToken(response.token); 
                console.log("Login successful!");
            } else {
                console.log("Invalid username or password")
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    return (
        <>
            <p className="title">Login Form</p>

            <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="username" {...register("username", { required: true })} />
                {errors.username && <span style={{ color: "red" }}>
                    *username* is mandatory </span>}
                <input type="password" {...register("password")} />
                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}
LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}
