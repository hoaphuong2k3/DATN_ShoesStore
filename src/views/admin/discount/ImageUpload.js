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

  const imageSize = '110px'; 

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    padding: '8px',
    cursor: 'pointer',
    border:  '1px dashed gray',
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

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ImageUpload;
