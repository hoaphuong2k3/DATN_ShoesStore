import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa'; 

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const imageUrl = file ? URL.createObjectURL(file) : null;

  const imageSize = '100px'; 

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: '50%', 
  };

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: 'transparent', 
    color: '#000',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    border:  '1px dashed black',
    width: imageSize,
    height: imageSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={{ position: 'relative', width: imageSize, height: imageSize }}
    >
      {imageUrl && <img alt="preview" src={imageUrl} style={imageStyle} />}
      <label htmlFor="file-input" style={buttonStyle}>
        <FaCamera size={15} /> 
      </label>
      <input type="file" id="file-input" onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageUpload;
