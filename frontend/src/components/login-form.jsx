import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const {register, handleSubmit, formState: { errors },} = useForm();

    const onSubmit = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.username));
        if (userData) {
            if (userData.password === data.password) {
                console.log(userData.name + " You Are Successfully Logged In");
            } else {
                console.log("username or Password is not matching with our record");
            }
        } else {
            console.log("username or Password is not matching with our record");
        }
    };
    return (
        <>
            <p className="title">Login Form</p>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input type="username" {...register("username", { required: true })} />
                {errors.username && <span style={{ color: "red" }}>
                    *username* is mandatory </span>}
                <input type="password" {...register("password")} />
                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}
