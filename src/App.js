// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Posts from './components/Post';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import View from './components/view';
import Gallery from './components/Gallery'; // import Gallery component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Gallery /> {/* Include Gallery component */}
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
