import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';

export default function BlogComments() {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}/comments`, { mode: "cors" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setComments(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!comments.length) return <p>No comments found</p>;

    return (
        <div className="py-5 flex flex-col gap-2" id="blogs">
            {comments.map(comment => (
                <div key={comment._id}>
                    <p className='text-base tracking-wide leading-loose pb-2font-serif text-lg'>{comment.user.username}: {comment.text}</p>
                    <p className='text-sm'><i>{DateTime.fromISO(comment.timestamp).toLocaleString(DateTime.DATE_MED)}</i></p>
                </div>
            ))}
        </div>
    );
}
