import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function BlogComments({ isAuthor }) {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}/comments`, { mode: "cors" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {
                setComments(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [postId]);

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete the comment: ${errorMessage}`);
            }
            // delete comment from state
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditToggle = (commentId) => {
        const comment = comments.find(c => c._id === commentId);
        if (comment) {
            setEditingCommentId(commentId);
            setValue('text', comment.text);
            setIsEditMode(prev => !prev);
        }
    };

    const handleUpdate = async (data) => {
        const updatedCommentData = {
            text: data.text,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${editingCommentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(updatedCommentData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to update the comment: ${errorMessage}`);
            }

            // update comment in state
            setComments(comments.map(comment => comment._id === editingCommentId ? 
                { ...comment, text: data.text, timestamp: updatedCommentData.timestamp } : comment));
            setIsEditMode(false);
            setEditingCommentId(null);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!comments.length) return <p>No comments</p>;

    return (
        <div className="py-5 flex flex-col gap-2" id="blogs">
            {comments.map(comment => (
                <div key={comment._id} className="border p-2 mb-2">
                    {isAuthor && (
                        <div>
                            <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 mb-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(comment._id)}>Delete Comment</button>
                            <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 mb-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEditToggle(comment._id)}>{isEditMode && editingCommentId === comment._id ? 'Cancel' : 'Edit Comment'}</button>
                        </div>
                    )}
                    {isEditMode && editingCommentId === comment._id ? (
                        <form onSubmit={handleSubmit(handleUpdate)} className="edit-post-form">
                            <textarea {...register('text', { required: true })} defaultValue={comment.text} className="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 resize-y rounded-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.text && <p className="text-red-500">Text is required</p>}
                            <button type="submit" className="mt-6 bg-green-500 hover:bg-green-900 text-white font-bold rounded py-2 px-4 focus:outline-none focus:shadow-outline">Update Comment</button>
                        </form>
                    ) : (
                        <div>
                            <p className='text-base tracking-wide leading-loose pb-2 font-serif text-lg'>
                                {comment.user.username}: {comment.text}
                            </p>
                            <p className='text-sm'>
                                <i>{DateTime.fromISO(comment.timestamp).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</i>
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
