import React from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
  return (
    <div>
      <div className='header'>
        <h2>Welcome, Web Wanderer!</h2>
        <h3>"BLOG"</h3>
        <p>awesome place to make oneself productive and entertained through daily updates.</p>
      </div>
      <div className="signup-button">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Posts;