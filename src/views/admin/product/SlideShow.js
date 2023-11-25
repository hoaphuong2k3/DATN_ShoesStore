import React, { useState, useEffect } from 'react';

const SlideShow = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImage, images.length]);
    const imageSize = "80px";
    const imageStyle = {
        width: imageSize,
        height: imageSize,
    };
    return (
        <div className="slideshow-container">
            <img src={images[currentImage]} alt={`slide-${currentImage}`} style={imageStyle} />
        </div>
    );
};

export default SlideShow;