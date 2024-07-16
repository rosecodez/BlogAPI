import React from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function LoginForm( { setToken } ) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupError, setSignupError] = useState('');

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
                console.log("Invalid username or password");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    return (
        <div className="font-mono w-full max-w-xs">

            <div id="signup-container" className='pt-5'>
                <h6 className='pb-3'>Don't have an account?</h6>
                <a href='signup'>Sign up</a>
            </div>

            <b><p className="title pb-2 pt-5">Login Form</p></b>

            <form id="login-form" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username" placeholder="Username">Username</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="username" {...register("username", { required: true })} />
                {errors.username && <span style = { { color: "red" } }>Username is mandatory</span>}

                <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="password" placeholder="password">Password</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" {...register("password", { required: true })} />
                {errors.password && <span style={{ color: "red" }}>Password is mandatory</span>}

                <button className='mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Log in</button>            
            </form>
        </div>
    );
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};
