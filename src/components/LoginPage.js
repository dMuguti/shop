import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import back from '../back.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:9292/logIn';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      const data = await response.json();

      if (data.logged_in) {
        console.log(data.user); // User data
        navigate('/view'); 
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <section className='login'>
      <div className='container'>
        <div className='backImg'>
          <img src={back} alt='' />
          <div className='text'>
            <h3>Login</h3>
            <h1>My account</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <span>Username or email address *</span>
          <input 
            type='text' 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password *</span>
          <input 
            type='password' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='button' type="submit">Log in</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
