import React, { useState, useEffect } from "react";
import { DateTime } from "luxon"; 
import { Link, useParams } from "react-router-dom";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import BlogComments from "./post-comments";
import NewComment from "./new-comment";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function BlogDetail( {isAuthenticated, isAuthor}) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [postTitle, setPostTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNewCommentForm, setShowNewCommentForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error");
            }
            return response.json();
        })
        .then(data => {
            setPost(data);
            setPostTitle(data.title);
            setPostText(data.text);
            setComments(data.comments);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }, [postId]);
    
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete the post: ${errorMessage}`);
          }
          navigate('/'); 
        } catch (error) {
          setError(error.message);
        }
    };

    const handleEditToggle = () => {
        setIsEditMode(prev => !prev);
    };

    const handleUpdate = async (data) => {
        const updatedPostData = {
            title: data.title,
            text: data.text,
            timestamp: new Date().toISOString(),
            published: true,
            userId: post.user,
        };

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(updatedPostData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to update the post: ${errorMessage}`);
            }

            console.log("Post successfully updated!");
            navigate('/'); 
        } catch (error) {
            setError(error.message);
        }
    };
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <section id="blog-posts-section">
            <div className="py-5" id="blogs">
                
                {isAuthor && (
                    <div>
                        <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 mb-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete}>Delete Post</button>
                        <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 mb-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEditToggle}>{isEditMode ? 'Cancel' : 'Edit Post'}</button>
                    </div>
                )}

                <div id="post">
                    {isEditMode ? (
                        <form onSubmit={handleSubmit(handleUpdate)} className="edit-post-form">
                            <input {...register('title', { required: true })} defaultValue={post.title} className="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500resize-y rounded-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.title && <p className="text-red-500">Title is required</p>}
                            <textarea {...register('text', { required: true })} defaultValue={post.text} className="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500resize-y rounded-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.text && <p className="text-red-500">Text is required</p>}
                            <button type="submit" className="mt-6 bg-green-500 hover:bg-green-900 text-white font-bold rounded py-2 px-4 focus:outline-none focus:shadow-outline">Update Post</button>
                        </form>
                    ) : (
                        <>
                            <p className="pb-2 font-mono"><b>{post.title}</b></p>
                            <p className="tracking-wide leading-loose pb-2 indent-8 font-serif">{post.text.replace(/\./g, ".\n")}</p>
                            <p><i>{DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}</i></p>
                        </>
                    )}
                </div>

                <div id="post-likes-comments" className="flex gap-3 pt-2">
                    <div id="likes-container" className="flex gap-1 items-center">
                        <img className="post-images" src={like} alt="Like" />
                        <div className="text">
                            <p>{likesCount}</p>
                        </div>
                    </div>
                    <div id="comments-container" className="flex gap-1 items-center">
                        <img className="post-images" src={comment} alt="Comment" />
                        <div className="text">
                            <p>{commentsCount}</p>
                        </div>
                    </div>
                </div>

                {isAuthenticated ? 
                    <div id="leave-a-comment" className="flex flex-col gap-3 items-baseline">
                        <button
                            className="mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold rounded py-2 px-4 focus:outline-none focus:shadow-outline"
                            onClick={() => setShowNewCommentForm(!showNewCommentForm)}>
                            {showNewCommentForm ? "Cancel" : "Leave a comment"}
                        </button>
                    </div>
                    :
                    <a href="/login">Login to leave a comment</a>
                }


                {showNewCommentForm && <NewComment />}
                <div id="comments" className="border-solid rounded-lg border-4 border-indigo-200 border-t-indigo-300 p-2 mt-3">
                    <p className="text-lg">Comments</p>
                    <BlogComments isAuthor={isAuthor} comments={comments} />
                </div>
            </div>
        </section>
    );
}
