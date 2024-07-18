import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon'; 

export default function BlogComments() {
    const { postId } = useParams();
    const [comments, setComments] = useState(null);
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
                setComments(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>No comment found</p>;

    rreturn (
        <section id="blog-comments-section">
            <div className="py-5" id="blogs">
                {comments.map(comment => (
                    <div key={comment._id} className="mb-4">
                        <p className='pb-2 font-mono'><b>{comment.title}</b></p>
                        <p className='tracking-wide leading-loose pb-2 indent-8 font-serif'>{comment.text}</p>
                        <p><i>{DateTime.fromISO(comment.timestamp).toLocaleString(DateTime.DATE_MED)}</i></p>
                    </div>
                ))}
            </div>
        </section>
    );
}
