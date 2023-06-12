import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AboutPage = () => {
  return (
    <div>
      <h2>PostMaster</h2>
      <p>Welcome to PostMaster - your one-stop destination for inspiring stories, thought-provoking insights, and informative articles.</p>
      <p>Since its inception, PostMaster has been a place to share ideas and insights, challenge conventions, and provoke conversations. With a diverse range of topics covered, there's something for everyone here, whether you're seeking personal growth advice, current events analysis, or lifestyle tips.</p>
      <p>We are committed to providing high-quality content that enlightens, inspires, and informs. Our authors are passionate about sharing their unique perspectives and experiences, and we hope you find their stories engaging and insightful.</p>
      <p>Thank you for stopping by and being a part of our journey. We hope you enjoy what you read and come back for more!</p>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        <a href="https://www.facebook.com/your_facebook_username" target="_blank" rel="noreferrer" style={{color: '#3b5998', marginRight: '10px'}}>
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com/your_twitter_username" target="_blank" rel="noreferrer" style={{color: '#00acee', marginRight: '10px'}}>
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com/your_instagram_username" target="_blank" rel="noreferrer" style={{color: '#C13584', marginRight: '10px'}}>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/your_linkedin_username" target="_blank" rel="noreferrer" style={{color: '#0e76a8'}}>
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
