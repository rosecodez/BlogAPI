import React, { useState, useEffect } from "react";
import { DateTime } from "luxon"; 
import { useParams } from "react-router-dom";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import BlogComments from "./post-comments";
import NewComment from "./new-comment";
import { useNavigate } from 'react-router-dom';

export default function BlogDetail( {isAuthenticated, isAuthor}) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [postText, setPostText] = useState("");
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNewCommentForm, setShowNewCommentForm] = useState(false);
    
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
            throw new Error(`Failed to delete the post: ${errorMessage}`);
          }
          navigate('/'); 
        } catch (error) {
          setError(error.message);
        }
      };

    const postTextWithBreaks = postText.replaceAll(".", ".\n");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <section id="blog-posts-section">
            <div className="py-5" id="blogs">
                
                {isAuthor && (
                    <div id="delete-post" className="mt-4">
                        <button className="mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete}>Delete Post</button>
                    </div>
                )}

                <div id="post">
                    <p className="pb-2 font-mono"><b>{post.title}</b></p>
                    <p className="tracking-wide leading-loose pb-2 indent-8 font-serif">{postTextWithBreaks}</p>
                    <p><i>{DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}</i></p>
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

                {isAuthenticated && (
                    <div id="leave-a-comment">
                        <button
                            className="mt-6 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setShowNewCommentForm(!showNewCommentForm)}>
                            {showNewCommentForm ? "Cancel" : "Leave a comment"}
                        </button>
                    </div>
                )}

                {showNewCommentForm && <NewComment />}
                <div id="comments" className="border-solid rounded-lg border-4 border-indigo-200 border-t-indigo-300 p-2 mt-3">
                    <p className="text-lg">Comments</p>
                    <BlogComments comments={comments} />
                </div>
            </div>
        </section>
    );
}
