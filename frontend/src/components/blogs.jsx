import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon'; 

export default function BlogsSection() {
    const blogsLink = 'http://localhost:3000/posts';
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(blogsLink, { mode: "cors" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setPosts(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [blogsLink]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section id="blog-posts-section">
            <h4>Latest posts</h4>
            <div id="blogs">
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <div className="title">{post.title}</div>
                        <div className="text">{post.text}</div>
                        <div className="timestamp">
                            {DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}
                        </div>
                        <div className="published">{post.published}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
