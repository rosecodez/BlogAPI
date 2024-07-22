import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useParams, useNavigate } from 'react-router-dom';

export default function BlogComments({ isAuthor }) {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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
            navigate(0);
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
                        <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(comment._id)}>Delete Comment</button>
                    )}
                    <p className='text-base tracking-wide leading-loose pb-2 font-serif text-lg'>
                        {comment.user.username}: {comment.text}
                    </p>
                    <p className='text-sm'>
                        <i>{DateTime.fromISO(comment.timestamp).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</i>
                    </p>
                </div>
            ))}
        </div>
    );
}
