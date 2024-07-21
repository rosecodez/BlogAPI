// NewComment.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function NewComment() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newCommentError, setNewCommentError] = useState("");

  const newComment = async (commentData) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const commentDataWithUserId = { ...commentData, userId };

      const response = await fetch(`http://localhost:3000/posts/${postId}/comments/newComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(commentDataWithUserId),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setNewCommentError(`Creating new comment failed: ${errorData.message}`);
        console.error("Error creating new comment:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("New comment created:", data);
      navigate(0);
    } catch (error) {
      console.error("Error creating new comment:", error.message);
      setNewCommentError(`Error creating new comment: ${error.message}`);
    }
  };

  const onSubmit = (data) => {
    setNewCommentError("");
    console.log("Form data submitted:", data);
    newComment(data);
  };

  return (
    <form id="new-comment-form" className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="pt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Text</label>
      <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("text", { required: true })} placeholder="Enter your comment text"></textarea>
      {errors.text && <span style={{ color: "red" }}>Text is required</span>}

      {newCommentError && <span className="pt-4" style={{ color: "red" }}>{newCommentError}</span>}

      <button className="mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Send</button>
    </form>
  );
}
