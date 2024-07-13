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
        <div className='w-full max-w-xs'>
            <b><h3 className="title pb-2 font-mono pt-5">Signup Form</h3></b>

            <form id="signup-form" className='font-mono flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" {...register("username", { required: true })} placeholder="Username" />
                {errors.username && <span style={{ color: "red" }}>Username is mandatory</span>}
                
                <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <span style={{ color: "red" }}>Password is mandatory</span>}
                <button className='mt-8 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="button" value="Sign Up">Submit</button>
            </form>
        </div>
    );
}

SignupForm.propTypes = {
    setToken: PropTypes.func.isRequired,
};
