import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';


const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:9292/signUp";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: name,
            email: email,
            password: password
          }
        }),
      });

      const data = await response.json();

      // Handle response or redirect to the login page
      console.log(data);
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Sign-up error", error);
    }
  };

  return (
    <div className='signup-form'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;