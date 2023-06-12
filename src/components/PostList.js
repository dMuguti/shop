import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9292/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const handlePostClick = post => {
    setSelectedPost(post);
  };

  const handleAddPost = async (event) => {
    event.preventDefault();

    const newPost = { title, body };

    try {
      const response = await fetch('http://localhost:9292/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const createdPost = await response.json();
      setPosts(prevPosts => [...prevPosts, createdPost]);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleAddPost}>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title" 
          required 
        />
        <textarea 
          value={body} 
          onChange={e => setBody(e.target.value)} 
          placeholder="Body" 
          required 
        />
        <button type="submit">Add post</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => handlePostClick(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
