import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function NewBlog() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [newBlogError, setNewBlogError] = useState('');
    
    const newPost = async (postData) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const postDataWithUserId = { ...postData, userId };

            const response = await fetch("http://localhost:3000/posts/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(postDataWithUserId),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setNewBlogError(`Creating new post failed: ${errorData.message}`);
                console.error("Error creating new post:", errorData.message);
                return;
            }

            const data = await response.json();
            console.log("New post created:", data);
            navigate("/");

        } catch (error) {
            console.error("Error creating new post:", error.message);
            setNewBlogError(`Error creating new post: ${error.message}`);
        }
    }

    const onSubmit = (data) => {
        setNewBlogError("");
        console.log("Form data submitted:", data)
        newPost(data);
    };
    
    return (
        <form id="new-blog-form" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" {...register("title", { required: true })} placeholder="Enter your title" />
            {errors.title && <span style={{ color: "red" }}>Title is required</span>}

            <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Text</label>
            <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register("text", { required: true })} placeholder="Enter your blog text"></textarea>
            {errors.text && <span style={{ color: "red" }}>Text is required</span>}

            {newBlogError && <span className='pt-4' style={{ color: "red"}}>{newBlogError}</span>}

            <button className='mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Create Post</button>
        </form>
    )
}
