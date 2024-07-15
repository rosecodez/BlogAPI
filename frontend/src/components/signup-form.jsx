import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signupUser = async (credentials) => {
        try {
            const response = await fetch("http://localhost:3000/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Signup failed:", errorData.message);
                return;
            }
    
            const data = await response.json();
            console.log("Signup successful:", data);
            navigate("/");
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    const onSubmit = (data) => {
        signupUser(data);
    };

    return (
        <div className='font-mono w-full max-w-xs'>
            <div id="login-container" className='pt-5'>
                <h6 className='pb-3'>Already have an account?</h6>
                <a href='login'>Log in</a>
            </div>

            <b><h3 className="title pb-2 pt-5">Signup Form</h3></b>

            <form id="signup-form" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="username" {...register("username", { required: true })} placeholder="Username" />
                {errors.username && <span style={{ color: "red" }}>Username is mandatory. Minimum 6 letters</span>}
                
                <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" name="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <span style={{ color: "red" }}>Password is mandatory. Minimum 10 letters</span>}

                <button className='mt-8 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Sign Up</button>
            </form>
        </div>
    );
}
