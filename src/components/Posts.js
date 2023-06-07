import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const createPost = async () => {
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

    createPost();
  };

  return (
    <div>
      {selectedPost ? (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <button onClick={() => setSelectedPost(null)}>Back</button>
        </div>
      ) : (
        <div>
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
          <ul>
            {posts.map((post) => (
              <li key={post.id} onClick={() => handlePostClick(post)}>
                <h2>{post.title}</h2>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Posts;
