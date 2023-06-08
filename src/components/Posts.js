import React, { useState, useEffect } from 'react';
import './post.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9292/posts', {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual authentication token
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleComment = () => {
    setShowComment(true);
  };

  const handleCommentSubmit = () => {
    setShowComment(false);
    // Logic to handle the submitted comment, such as sending it to the server or updating the state
    // You can access the comment value using the `comment` state variable
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:9292/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual authentication token
        },
        body: JSON.stringify({ title, body }),
      });
      const newPost = await response.json();
      setPosts((oldPosts) => [...oldPosts, newPost]);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <div className='header'>
        <h2>Welcome, Web Wanderer!</h2>
        <h3>"BLOG"</h3>
        <p>awesome place to make <br/>oneself productive and entertained through daily updates.</p>
      </div>
      {selectedPost ? (
        <div className="post-details">
          <h2 className="popup-title">{selectedPost.title}</h2>
          <p className="popup-body">{selectedPost.body}</p>
          <button onClick={() => setSelectedPost(null)} className="popup-button">
            Back
          </button>
          <div className="like-section">
            <button onClick={handleLike} className="like-button">
              Like
            </button>
            <p className="like-count">{likeCount} Likes</p>
          </div>
          <div className="comment-section">
            <button onClick={handleComment} className="comment-button">
              Comment
            </button>
            {showComment && (
              <div className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comment"
                />
                <button onClick={handleCommentSubmit} className="comment-submit">
                  Submit
                </button>
              </div>
            )}
            {comment && (
              <div className="comment-display">
                <p>Your Comment: {comment}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="post-cards">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="post-card"
              >
                <h2>{post.title}</h2>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
            <button type="submit">Add Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Posts;
