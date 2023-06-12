import React, { useState } from 'react';
import './Gallery.css';

import img1 from '../images/pexels-burst-374768.jpg';
import img2 from '../images/pexels-canva-studio-3153204.jpg';
import img3 from '../images/pexels-drew-williams-3098619.jpg';
import img4 from '../images/pexels-kindel-media-7688658.jpg';
import img5 from '../images/pexels-pixabay-267569.jpg';
import img6 from '../images/pexels-photomix-company-230544.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    }

    return (
        <div className="gallery-container" style={{backgroundImage: `url(${images[currentImage]})`}}>
            <button className="change-image-button" onClick={nextImage}>&rarr;</button>
        </div>
    );
}

export default Gallery;
