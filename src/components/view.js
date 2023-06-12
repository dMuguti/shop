import React, { useState, useEffect } from 'react';
import './post.css';

const View = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9292/posts', {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual authentication token
          },
        });
        const data = await response.json();
        const posts = data.map((post) => ({ ...post, likeCount: 0, comment: '' }));
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setComment('');
  };

  const handleLike = (post) => {
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, likeCount: p.likeCount + 1 } : p
    );
    setPosts(updatedPosts);
    setSelectedPost(updatedPosts.find((p) => p.id === post.id));
  };

  const handleComment = () => {
    setShowComment(true);
  };

  const handleCommentSubmit = (post, comment) => {
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, comment } : p
    );
    setPosts(updatedPosts);
    setSelectedPost(updatedPosts.find((p) => p.id === post.id));
    setShowComment(false);
    setComment('');
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch(`http://localhost:9292/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual authentication token
        },
      });

      if (response.ok) {
        const updatedPosts = posts.filter((p) => p.id !== post.id);
        setPosts(updatedPosts);
        setSelectedPost(null);
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:9292/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_AUTH_TOKEN',
        },
        body: JSON.stringify({ title, body }),
      });
      const newPost = await response.json();
      setPosts((oldPosts) => [...oldPosts, newPost]);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-post-form">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit">Add Post</button>
      </form>
      {selectedPost ? (
        <div className="post-details">
          <h2 className="popup-title">{selectedPost.title}</h2>
          <p className="popup-body">{selectedPost.body}</p>
          <button onClick={() => setSelectedPost(null)} className="popup-button">
            Back
          </button>
          <button onClick={() => handleDelete(selectedPost)} className="popup-button delete">
            Delete
          </button>
          <div className="like-section">
            <button onClick={() => handleLike(selectedPost)} className="like-button">
              Like
            </button>
            <p className="like-count">{selectedPost.likeCount} Likes</p>
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
                <button onClick={() => handleCommentSubmit(selectedPost, comment)} className="comment-submit">
                  Submit
                </button>
              </div>
            )}
            {selectedPost.comment && (
              <div className="comment-display">
                <p>Your Comment: {selectedPost.comment}</p>
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
        </div>
      )}
    </div>
  );
};

export default View;
