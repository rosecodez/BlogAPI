import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const loginUser = async (credentials) => {
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setLoginError(`Login failed: ${errorData.message}`);
                return;
            }
            const data = await response.json();
            console.log("Login successful:", data);
            localStorage.setItem('token', data.token);
            navigate("/");
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };

    const onSubmit = (data) => {
        setLoginError('');
        loginUser(data);
    };
    
    return (
        <div className="font-mono w-full max-w-xs">

            <div id="login-container" className='pt-5'>
                <h6 className='pb-3'>Don't have an account?</h6>
                <a href='signup'>Sign up</a>
            </div>

            <b><p className="title pb-2 pt-5">Login Form</p></b>

            <form id="login-form" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" {...register("username", { required: true })} placeholder="Enter your username" />
                {errors.username && <span style={{ color: "red" }}>Username is required</span>}

                <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" {...register("password", { required: true })} placeholder="Enter your password" />
                {errors.password && <span style={{ color: "red" }}>Password is required</span>}

                {loginError && <span className='pt-4' style={{ color: "red"}}>{loginError}</span>}

                <button className='mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Log in</button>
            </form>
        </div>
    );
}

