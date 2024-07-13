import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon'; 
import  like from "../assets/like.png"
import  comment from "../assets/comment.png"

export default function BlogsSection() {
    const blogsLink = 'http://localhost:3000/posts';
    const [posts, setPosts] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('http://localhost:3000/posts', { mode: "cors" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {

                setPosts(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
            
    }, [blogsLink]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <section id="blog-posts-section">
            <b><h3 className='pt-5'>Latest posts</h3></b>
            <div className="py-5"id="blogs">
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <p><b>{post.title}</b></p>
                        <p className='post-text tracking-wide leading-loose'>{post.text}</p>
                        <p>
                            {DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}
                        </p>
                        <p>{post.published}</p>
                        <div id="post-likes-comments" className='flex gap-3'>
                            <div id="likes-container" className='flex gap-1 align-items: center'>
                                <img className='post-images' src={like} alt="Like" />
                                <div className="text">
                                    <p>{likesCount}</p>
                                </div>
                            </div>
                            <div id="comments-container" className='flex gap-1 align-items: center'>
                                <img className='post-images' src={comment} alt="Comment" />
                                <div className="text">
                                    <p>{commentsCount}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                ))}
            </div>
        </section>
    );
}
