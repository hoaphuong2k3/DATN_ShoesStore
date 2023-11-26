import React, { useState, useEffect } from 'react';

const SlideShow = ({ images, imageSize }) => {
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        // Thêm kiểm tra images và images.length
        if (images && images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 3000);

            // Hủy interval khi component unmount
            return () => clearInterval(interval);
        }
    }, [currentImage, images]);
    // const imageSize = "80px";
    const imageStyle = {
        width: imageSize,
        height: imageSize,
    };
    if (images === null) {
        return null;
    } else {
        return (
            <div className="slideshow-container">
                <img
                    src={`https://s3-ap-southeast-1.amazonaws.com/imageshoestore/${images[currentImage].imgURI}`}
                    alt={`${currentImage}`} style={imageStyle} />
            </div>
        );
    }
};

export default SlideShow;