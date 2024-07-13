import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon'; 
import { useParams } from 'react-router-dom';
import  like from "../assets/like.png"
import  comment from "../assets/comment.png"

export default function BlogDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const[postText, setPostText] = useState('');
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0)

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {
                setPost(data);
                setPostText(data.text);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [postId]);
    
    const postTextWithBreaks = postText.replaceAll('.', '.\n');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <section id="blog-posts-section">
            <h3 className='pt-5'><b>Post Details</b></h3>
            <div className="py-5" id="blogs">
                <div id="post">
                    <p className='pb-2 font-mono'><b>{post.title}</b></p>
                    <p className='tracking-wide leading-loose pb-2 indent-8 font-serif'>{postTextWithBreaks}</p>
                    <p><i>{DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}</i></p>
                    <div id="post-likes-comments" className='flex gap-3 pt-2'>
                    <div id="likes-container" className='flex gap-1 items-center'>
                        <img className='post-images' src={like} alt="Like" />
                        <div className="text">
                            <p>{likesCount}</p>
                        </div>
                    </div>
                    <div id="comments-container" className='flex gap-1 items-center'>
                        <img className='post-images' src={comment} alt="Comment" />
                        <div className="text">
                            <p>{commentsCount}</p>
                        </div>
                    </div>
                    </div>
                    <div id="comments" className='border-solid border-2 border-indigo-300'>

                    </div>
                </div>
                
            </div>
        </section>
    );
}
