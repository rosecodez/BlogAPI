import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export default function SignupForm({ setToken }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signupUser = async (credentials) => {
        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                console.log("Signup successful!");
            } else {
                console.log("Signup failed:", data.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const onSubmit = (data) => {
        signupUser(data);
    };

    return (
        <>
            <p className="title">Signup Form</p>

            <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} placeholder="Name" />
                <input type="text" {...register("username", { required: true })} placeholder="Username" />
                {errors.username && <span style={{ color: "red" }}>Username is mandatory</span>}
                <input type="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <span style={{ color: "red" }}>Password is mandatory</span>}
                <input type="submit" style={{ backgroundColor: "#a1eafb" }} value="Sign Up" />
            </form>
        </>
    );
}

SignupForm.propTypes = {
    setToken: PropTypes.func.isRequired,
};
